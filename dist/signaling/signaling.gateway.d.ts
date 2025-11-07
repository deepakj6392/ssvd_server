import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { SignalingMessage } from '.';
export declare class SignalingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleJoinSession(data: {
        sessionId: string;
        userId: string;
    }, client: Socket): {
        event: string;
        data: {
            sessionId: string;
        };
    };
    handleLeaveSession(data: {
        sessionId: string;
        userId: string;
    }, client: Socket): {
        event: string;
        data: {
            sessionId: string;
        };
    };
    handleSignal(signalingMessage: SignalingMessage, client: Socket): void;
    handleChatMessage(data: {
        sessionId: string;
        userId: string;
        content: string;
    }, client: Socket): void;
    handleDrawingAction(data: {
        sessionId: string;
        action: any;
    }, client: Socket): void;
}
