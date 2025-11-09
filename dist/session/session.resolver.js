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
const mongoose_1 = require("mongoose");
const session_service_1 = require("./session.service");
const session_model_1 = require("./session.model");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const user_model_1 = require("../user/user.model");
const mongoose_2 = require("@nestjs/mongoose");
let SessionResolver = class SessionResolver {
    sessionService;
    pubSub;
    userModel;
    constructor(sessionService, pubSub, userModel) {
        this.sessionService = sessionService;
        this.pubSub = pubSub;
        this.userModel = userModel;
    }
    async sessions() {
        return this.sessionService.getActiveSessions();
    }
    async session(id) {
        return this.sessionService.getSessionById(id);
    }
    async createSession(name, user) {
        const userId = user.userId || user.sub;
        const session = await this.sessionService.createSession(name, userId);
        this.pubSub.publish('sessionCreated', { sessionCreated: session });
        return session;
    }
    async joinSession(sessionId, user) {
        const userId = user.userId || user.sub;
        const session = await this.sessionService.joinSession(sessionId, userId);
        if (session) {
            this.pubSub.publish('sessionUpdated', { sessionUpdated: session });
        }
        return session;
    }
    async leaveSession(sessionId, user) {
        const userId = user.userId || user.sub;
        const session = await this.sessionService.leaveSession(sessionId, userId);
        if (session) {
            this.pubSub.publish('sessionUpdated', { sessionUpdated: session });
        }
        return session;
    }
    async endSession(sessionId, user) {
        const userId = user.userId || user.sub;
        const success = await this.sessionService.endSession(sessionId, userId);
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
    async hostName(session) {
        const user = await this.userModel.findById(session.hostId).exec();
        return user?.name || 'Unknown User';
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
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "createSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => session_model_1.Session, { nullable: true }),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('sessionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "joinSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => session_model_1.Session, { nullable: true }),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('sessionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "leaveSession", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('sessionId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
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
    (0, graphql_1.ResolveField)(() => String, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_model_1.Session]),
    __metadata("design:returntype", Promise)
], SessionResolver.prototype, "hostName", null);
__decorate([
    (0, graphql_1.Subscription)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SessionResolver.prototype, "sessionEnded", null);
exports.SessionResolver = SessionResolver = __decorate([
    (0, graphql_1.Resolver)(() => session_model_1.Session),
    __param(1, (0, common_1.Inject)('PUB_SUB')),
    __param(2, (0, mongoose_2.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [session_service_1.SessionService,
        graphql_subscriptions_1.PubSubEngine,
        mongoose_1.Model])
], SessionResolver);
//# sourceMappingURL=session.resolver.js.map