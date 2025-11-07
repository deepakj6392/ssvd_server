import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { Session, SessionSchema } from './session.model';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [
    SessionService,
    SessionResolver,
    {
      provide: 'PUB_SUB',
      useClass: PubSub,
    },
  ],
  exports: [SessionService],
})
export class SessionModule {}
