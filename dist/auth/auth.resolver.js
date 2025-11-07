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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
let AuthResolver = class AuthResolver {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(email, password, name) {
        const result = await this.authService.register(email, password, name);
        return result.access_token;
    }
    async login(email, password) {
        const result = await this.authService.login(email, password);
        return result.access_token;
    }
    async forgotPassword(email) {
        const result = await this.authService.forgotPassword(email);
        return result.message;
    }
    async resetPassword(token, newPassword) {
        const result = await this.authService.resetPassword(token, newPassword);
        return result.message;
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __param(2, (0, graphql_1.Args)('name', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "forgotPassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('token')),
    __param(1, (0, graphql_1.Args)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "resetPassword", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map