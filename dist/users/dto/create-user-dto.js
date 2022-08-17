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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example@mail.ru', description: 'почтовый адрес пользователя' }),
    (0, class_validator_1.IsString)({ message: 'Введите корректный емайл' }),
    (0, class_validator_1.IsEmail)({}, { message: "Некорректный email" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1234Qwerty', description: 'пароль пользователя' }),
    (0, class_validator_1.Matches)(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, { message: 'Пароль должен содержать минимум одну цифру, одну заглавную и одну строчную буквы' }),
    (0, class_validator_1.MinLength)(4, { message: 'Длина пароля должна быть не меньше 4 символов' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'User_user', description: 'Никнейм' }),
    (0, class_validator_1.IsString)({ message: 'Введите корректный никнейм' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nickname", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user-dto.js.map