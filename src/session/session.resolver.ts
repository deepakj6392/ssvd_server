import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { SessionService } from './session.service';
import { Session } from './session.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Resolver(() => Session)
export class SessionResolver {
  constructor(
    private readonly sessionService: SessionService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
  ) {}

  @Query(() => [Session])
  async sessions() {
    return this.sessionService.getActiveSessions();
  }

  @Query(() => Session, { nullable: true })
  async session(@Args('id') id: string) {
    return this.sessionService.getSessionById(id);
  }

  @Mutation(() => Session)
  async createSession(@Args('name') name: string) {
    const session = await this.sessionService.createSession(
      name,
      'test-user-id',
    );
    this.pubSub.publish('sessionCreated', { sessionCreated: session });
    return session;
  }

  @Mutation(() => Session, { nullable: true })
  async joinSession(@Args('sessionId') sessionId: string) {
    const session = await this.sessionService.joinSession(
      sessionId,
      'test-user-id',
    );
    if (session) {
      this.pubSub.publish('sessionUpdated', { sessionUpdated: session });
    }
    return session;
  }

  @Mutation(() => Session, { nullable: true })
  async leaveSession(@Args('sessionId') sessionId: string) {
    const session = await this.sessionService.leaveSession(
      sessionId,
      'test-user-id',
    );
    if (session) {
      this.pubSub.publish('sessionUpdated', { sessionUpdated: session });
    }
    return session;
  }

  @Mutation(() => Boolean)
  async endSession(@Args('sessionId') sessionId: string) {
    const success = await this.sessionService.endSession(
      sessionId,
      'test-user-id',
    );
    if (success) {
      this.pubSub.publish('sessionEnded', { sessionEnded: sessionId });
    }
    return success;
  }

  @Subscription(() => Session, { nullable: true })
  sessionCreated() {
    return (this.pubSub as any).asyncIterator('sessionCreated');
  }

  @Subscription(() => Session, { nullable: true })
  sessionUpdated() {
    return (this.pubSub as any).asyncIterator('sessionUpdated');
  }

  @Subscription(() => String)
  sessionEnded() {
    return (this.pubSub as any).asyncIterator('sessionEnded');
  }
}
