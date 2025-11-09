import { Resolver, Query, Mutation, Args, Subscription, ResolveField, Parent } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { SessionService } from './session.service';
import { Session } from './session.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User, UserDocument } from '../user/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Resolver(() => Session)
export class SessionResolver {
  constructor(
    private readonly sessionService: SessionService,
    @Inject('PUB_SUB') private pubSub: PubSubEngine,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
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
  @UseGuards(JwtAuthGuard)
  async createSession(@Args('name') name: string, @CurrentUser() user: any) {
    const userId = (user as any).userId || (user as any).sub;
    const session = await this.sessionService.createSession(name, userId);
    this.pubSub.publish('sessionCreated', { sessionCreated: session });
    return session;
  }

  @Mutation(() => Session, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async joinSession(
    @Args('sessionId') sessionId: string,
    @CurrentUser() user: any,
  ) {
    const userId = (user as any).userId || (user as any).sub;
    const session = await this.sessionService.joinSession(sessionId, userId);
    if (session) {
      this.pubSub.publish('sessionUpdated', { sessionUpdated: session });
    }
    return session;
  }

  @Mutation(() => Session, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async leaveSession(
    @Args('sessionId') sessionId: string,
    @CurrentUser() user: any,
  ) {
    const userId = (user as any).userId || (user as any).sub;
    const session = await this.sessionService.leaveSession(sessionId, userId);
    if (session) {
      this.pubSub.publish('sessionUpdated', { sessionUpdated: session });
    }
    return session;
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async endSession(
    @Args('sessionId') sessionId: string,
    @CurrentUser() user: any,
  ) {
    const userId = (user as any).userId || (user as any).sub;
    const success = await this.sessionService.endSession(sessionId, userId);
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

  @ResolveField(() => String, { nullable: true })
  async hostName(@Parent() session: Session) {
    const user = await this.userModel.findById(session.hostId).exec();
    return user?.name || 'Unknown User';
  }

  @Subscription(() => String)
  sessionEnded() {
    return (this.pubSub as any).asyncIterator('sessionEnded');
  }
}
