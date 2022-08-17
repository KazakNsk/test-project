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
exports.TagsController = void 0;
const query_params_dto_1 = require("./dto/query-params.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tags_model_1 = require("./tags.model");
const create_tag_dto_1 = require("./dto/create-tag.dto");
const tags_service_1 = require("./tags.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_tag_dto_1 = require("./dto/update-tag.dto");
let TagsController = class TagsController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    create(dto, req) {
        return this.tagService.createTag(dto, req);
    }
    getTagById(id) {
        return this.tagService.getTagById(id);
    }
    getTags(reqParam) {
        return this.tagService.getTags(reqParam);
    }
    update(tagDto, id, req) {
        return this.tagService.updateTag(tagDto, id, req);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создать тэг' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tags_model_1.Tag }),
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_dto_1.CreateTagDto, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить тэг по его id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tags_model_1.Tag }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "getTagById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить тэги' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tags_model_1.Tag }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_params_dto_1.QueryParams]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "getTags", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Изменить тэг (только создатель тэга)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tags_model_1.Tag }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_tag_dto_1.UpdateTagDto, String, Object]),
    __metadata("design:returntype", void 0)
], TagsController.prototype, "update", null);
TagsController = __decorate([
    (0, swagger_1.ApiTags)('Тэги'),
    (0, common_1.Controller)('tag'),
    __metadata("design:paramtypes", [tags_service_1.TagsService])
], TagsController);
exports.TagsController = TagsController;
//# sourceMappingURL=tags.controller.js.map