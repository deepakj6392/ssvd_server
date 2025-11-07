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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = exports.Session = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
let Session = class Session {
    _id;
    get id() {
        return this._id.toString();
    }
    name;
    hostId;
    participants;
    createdAt;
    isActive;
};
exports.Session = Session;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Session.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { name: 'id' }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Session.prototype, "id", null);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Session.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Session.prototype, "hostId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Session.prototype, "participants", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Session.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Session.prototype, "isActive", void 0);
exports.Session = Session = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)()
], Session);
exports.SessionSchema = mongoose_1.SchemaFactory.createForClass(Session);
//# sourceMappingURL=session.model.js.map