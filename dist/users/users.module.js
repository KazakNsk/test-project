"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const sequelize_1 = require("@nestjs/sequelize");
const users_controller_1 = require("./users.controller");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_model_1 = require("./users.model");
const tags_model_1 = require("../tags/tags.model");
const users_tags_model_1 = require("./users-tags.model");
const tags_module_1 = require("../tags/tags.module");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            tags_module_1.TagsModule,
            sequelize_1.SequelizeModule.forFeature([users_model_1.User, tags_model_1.Tag, users_tags_model_1.UserTag])
        ],
        exports: [users_service_1.UsersService]
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map