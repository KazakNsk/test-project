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
exports.UpdateTagDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateTagDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example', description: 'название тэга' }),
    (0, class_validator_1.IsString)({ message: 'название тэга должно быть строкой' }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined),
    __metadata("design:type", String)
], UpdateTagDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'example', description: 'порядковый номер для сортировки' }),
    (0, class_validator_1.IsString)({ message: 'порядковый номер для сортировки должен быть числом' }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined),
    __metadata("design:type", Number)
], UpdateTagDto.prototype, "sortOrder", void 0);
exports.UpdateTagDto = UpdateTagDto;
//# sourceMappingURL=update-tag.dto.js.map