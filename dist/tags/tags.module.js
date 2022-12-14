"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsModule = void 0;
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("../auth/auth.module");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_tags_model_1 = require("../users/users-tags.model");
const users_model_1 = require("../users/users.model");
const tags_controller_1 = require("./tags.controller");
const tags_model_1 = require("./tags.model");
const tags_service_1 = require("./tags.service");
let TagsModule = class TagsModule {
};
TagsModule = __decorate([
    (0, common_1.Module)({
        controllers: [tags_controller_1.TagsController],
        providers: [tags_service_1.TagsService],
        imports: [
            auth_module_1.AuthModule,
            jwt_1.JwtModule,
            sequelize_1.SequelizeModule.forFeature([tags_model_1.Tag, users_model_1.User, users_tags_model_1.UserTag])
        ],
        exports: [tags_service_1.TagsService]
    })
], TagsModule);
exports.TagsModule = TagsModule;
//# sourceMappingURL=tags.module.js.map