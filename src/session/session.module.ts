import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { Session, SessionSchema } from './session.model';
import { User, UserSchema } from '../user/user.model';
import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: User.name, schema: UserSchema }
    ]),
    AuthModule,
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
