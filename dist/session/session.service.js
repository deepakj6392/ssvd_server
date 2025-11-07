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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const session_model_1 = require("./session.model");
let SessionService = class SessionService {
    sessionModel;
    constructor(sessionModel) {
        this.sessionModel = sessionModel;
    }
    async createSession(name, hostId) {
        const session = new this.sessionModel({
            name,
            hostId,
            participants: [hostId],
        });
        return session.save();
    }
    async getSessionById(id) {
        return this.sessionModel.findById(id).exec();
    }
    async getActiveSessions() {
        return this.sessionModel.find({ isActive: true }).exec();
    }
    async joinSession(sessionId, userId) {
        const session = await this.sessionModel.findById(sessionId).exec();
        if (!session || !session.isActive)
            return null;
        if (!session.participants.includes(userId)) {
            session.participants.push(userId);
            await session.save();
        }
        return session;
    }
    async leaveSession(sessionId, userId) {
        const session = await this.sessionModel.findById(sessionId).exec();
        if (!session)
            return null;
        session.participants = session.participants.filter((id) => id !== userId);
        if (session.participants.length === 0) {
            session.isActive = false;
        }
        await session.save();
        return session;
    }
    async endSession(sessionId, hostId) {
        const session = await this.sessionModel.findById(sessionId).exec();
        if (!session || session.hostId !== hostId)
            return false;
        session.isActive = false;
        await session.save();
        return true;
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(session_model_1.Session.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SessionService);
//# sourceMappingURL=session.service.js.map