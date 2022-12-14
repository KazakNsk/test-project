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
exports.QueryParams = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class QueryParams {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2', description: 'страница пагинации' }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryParams.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10', description: 'количество тэгов на странице (offset)' }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryParams.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'true', description: 'сортировка по номеру' }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], QueryParams.prototype, "sortByOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'tag?sortByName=false', description: 'сортировка по имени' }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((_object, value) => value !== undefined),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], QueryParams.prototype, "sortByName", void 0);
exports.QueryParams = QueryParams;
//# sourceMappingURL=query-params.dto.js.map