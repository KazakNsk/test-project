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
exports.Tag = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const users_tags_model_1 = require("../users/users-tags.model");
const users_model_1 = require("../users/users.model");
let Tag = class Tag extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный идентификатор' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Tag.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'id пользователя создавшего тэг' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], Tag.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example', description: 'название тэга' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(40), allowNull: false }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4', description: 'порядковый номер для сортировки' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], Tag.prototype, "sortOrder", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => users_model_1.User, () => users_tags_model_1.UserTag),
    __metadata("design:type", Array)
], Tag.prototype, "users", void 0);
Tag = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'tags' })
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tags.model.js.map