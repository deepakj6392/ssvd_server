import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import type { SignalingMessage } from '.';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SignalingGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('SignalingGateway');

  afterInit(server: Server) {
    this.logger.log('Signaling Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-session')
  handleJoinSession(
    @MessageBody() data: { sessionId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.sessionId);
    this.logger.log(`User ${data.userId} joined session ${data.sessionId}`);

    // Notify other users in the session that a new user joined
    client.to(data.sessionId).emit('user-joined', {
      userId: data.userId,
      sessionId: data.sessionId,
    });

    return { event: 'joined-session', data: { sessionId: data.sessionId } };
  }

  @SubscribeMessage('leave-session')
  handleLeaveSession(
    @MessageBody() data: { sessionId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(data.sessionId);
    this.logger.log(`User ${data.userId} left session ${data.sessionId}`);

    // Notify other users in the session that a user left
    client.to(data.sessionId).emit('user-left', {
      userId: data.userId,
    });

    return { event: 'left-session', data: { sessionId: data.sessionId } };
  }

  @SubscribeMessage('signal')
  handleSignal(
    @MessageBody() signalingMessage: SignalingMessage,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(
      `Signaling message from ${signalingMessage.fromUserId} to ${signalingMessage.toUserId} in session ${signalingMessage.sessionId}`,
    );

    // Send to specific user in the session
    client.to(signalingMessage.sessionId).emit('signal', signalingMessage);
  }

  @SubscribeMessage('chat-message')
  handleChatMessage(
    @MessageBody() data: { sessionId: string; userId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = {
      id: Date.now().toString(),
      sessionId: data.sessionId,
      userId: data.userId,
      content: data.content,
      timestamp: new Date(),
    };

    this.logger.log(
      `Chat message in session ${data.sessionId} from ${data.userId}`,
    );

    // Broadcast to all users in the session
    this.server.to(data.sessionId).emit('chat-message', message);
  }

  @SubscribeMessage('drawing-action')
  handleDrawingAction(
    @MessageBody() data: { sessionId: string; action: any },
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`Drawing action in session ${data.sessionId}`);

    // Broadcast drawing action to all clients in the session except sender
    client.to(data.sessionId).emit('drawing-action', data);
  }
}
