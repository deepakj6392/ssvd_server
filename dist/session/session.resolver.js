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
exports.SessionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
const session_service_1 = require("./session.service");
const session_model_1 = require("./session.model");
let SessionResolver = class SessionResolver {
    sessionService;
    pubSub;
    constructor(sessionService, pubSub) {
        this.sessionService = sessionService;
        this.pubSub = pubSub;
    }
    async sessions() {
        return this.sessionService.getActiveSessions();
    }
    async session(id) {
        return this.sessionService.getSessionById(id);
    }
    async createSession(name) {
        const session = await this.sessionService.createSession(name, 'test-user-id');
        this.pubSub.publish('sessionCreated', { sessionCreated: session });
        return session;
    }
    async joinSession(sessionId) {
        const session = await this.sessionService.joinSession(sessionId, 'test-user-id');
        if (session) {
            this.pubSub.publish('sessionUpdated', { sessionUpdated: session });
        }
        return session;
    }
    async leaveSession(sessionId) {
        const session = await this.sessionService.leaveSession(sessionId, 'test-user-id');
        if (session) {
            this.pubSub.publish('sessionUpdated', { sessionUpdated: session });
        }
        return session;
    }
    async endSession(sessionId) {
        const success = await this.sessionService.endSession(sessionId, 'test-user-id');
        if (success) {
            this.pubSub.publish('sessionEnded', { sessionEnded: sessionId });
        }
        return success;
    }
    sessionCreated() {
        return this.pubSub.asyncIterator('sessionCreated');
    }
    sessionUpdated() {
        return this.pubSub.asyncIterator('sessionUpdated');
    }
    sessionEnded() {
        return this.pubSub.asyncIterator('sessionEnded');
    }
};
exports.SessionResolver = SessionResolver;
__decorate([
    (0, graphql_1.Query)(() => [session_model_1.Session]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "sessions", null);
__decorate([
    (0, graphql_1.Query)(() => session_model_1.Session, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "session", null);
__decorate([
    (0, graphql_1.Mutation)(() => session_model_1.Session),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "createSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => session_model_1.Session, { nullable: true }),
    __param(0, (0, graphql_1.Args)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "joinSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => session_model_1.Session, { nullable: true }),
    __param(0, (0, graphql_1.Args)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "leaveSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "endSession", null);
__decorate([
    (0, graphql_1.Subscription)(() => session_model_1.Session, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SessionResolver.prototype, "sessionCreated", null);
__decorate([
    (0, graphql_1.Subscription)(() => session_model_1.Session, { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SessionResolver.prototype, "sessionUpdated", null);
__decorate([
    (0, graphql_1.Subscription)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SessionResolver.prototype, "sessionEnded", null);
exports.SessionResolver = SessionResolver = __decorate([
    (0, graphql_1.Resolver)(() => session_model_1.Session),
    __param(1, (0, common_1.Inject)('PUB_SUB')),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        graphql_subscriptions_1.PubSubEngine])
], SessionResolver);
//# sourceMappingURL=session.resolver.js.map