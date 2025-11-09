"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
let SignalingGateway = class SignalingGateway {
    server;
    logger = new common_1.Logger('SignalingGateway');
    afterInit(server) {
        this.logger.log('Signaling Gateway initialized');
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinSession(data, client) {
        client.join(data.sessionId);
        this.logger.log(`User ${data.userId} joined session ${data.sessionId}`);
        client.to(data.sessionId).emit('user-joined', {
            userId: data.userId,
            sessionId: data.sessionId,
        });
        return { event: 'joined-session', data: { sessionId: data.sessionId } };
    }
    handleLeaveSession(data, client) {
        client.leave(data.sessionId);
        this.logger.log(`User ${data.userId} left session ${data.sessionId}`);
        client.to(data.sessionId).emit('user-left', {
            userId: data.userId,
        });
        return { event: 'left-session', data: { sessionId: data.sessionId } };
    }
    handleSignal(signalingMessage, client) {
        this.logger.log(`Signaling message from ${signalingMessage.fromUserId} to ${signalingMessage.toUserId} in session ${signalingMessage.sessionId}`);
        client.to(signalingMessage.toUserId).emit('signal', signalingMessage);
    }
    handleChatMessage(data, client) {
        const message = {
            id: Date.now().toString(),
            sessionId: data.sessionId,
            userId: data.userId,
            content: data.content,
            timestamp: new Date(),
        };
        this.logger.log(`Chat message in session ${data.sessionId} from ${data.userId}`);
        this.server.to(data.sessionId).emit('chat-message', message);
    }
    handleDrawingAction(data, client) {
        this.logger.log(`Drawing action in session ${data.sessionId}`);
        client.to(data.sessionId).emit('drawing-action', data);
    }
};
exports.SignalingGateway = SignalingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SignalingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-session'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleJoinSession", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-session'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleLeaveSession", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('signal'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleSignal", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat-message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleChatMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('drawing-action'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], SignalingGateway.prototype, "handleDrawingAction", null);
exports.SignalingGateway = SignalingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], SignalingGateway);
//# sourceMappingURL=signaling.gateway.js.map