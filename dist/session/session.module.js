"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const session_service_1 = require("./session.service");
const session_resolver_1 = require("./session.resolver");
const session_model_1 = require("./session.model");
const user_model_1 = require("../user/user.model");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const auth_module_1 = require("../auth/auth.module");
let SessionModule = class SessionModule {
};
exports.SessionModule = SessionModule;
exports.SessionModule = SessionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: session_model_1.Session.name, schema: session_model_1.SessionSchema },
                { name: user_model_1.User.name, schema: user_model_1.UserSchema }
            ]),
            auth_module_1.AuthModule,
        ],
        providers: [
            session_service_1.SessionService,
            session_resolver_1.SessionResolver,
            {
                provide: 'PUB_SUB',
                useClass: graphql_subscriptions_1.PubSub,
            },
        ],
        exports: [session_service_1.SessionService],
    })
], SessionModule);
//# sourceMappingURL=session.module.js.map