import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserResolver } from './user/user.resolver';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { SignalingModule } from './signaling/signaling.module';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/connect',
    ),
    AuthModule,
    SessionModule,
    SignalingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserResolver,
    {
      provide: 'PUB_SUB',
      useClass: PubSub,
    },
  ],
})
export class AppModule {}
