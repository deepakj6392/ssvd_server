import { Module } from '@nestjs/common';
import { SignalingGateway } from './signaling.gateway';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [SessionModule],
  providers: [SignalingGateway],
})
export class SignalingModule {}
