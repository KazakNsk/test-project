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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const jwt_1 = require("@nestjs/jwt");
const tags_model_1 = require("./tags.model");
;
let TagsService = class TagsService {
    constructor(tagRepository, jwtService) {
        this.tagRepository = tagRepository;
        this.jwtService = jwtService;
    }
    async createTag(dto, req) {
        await this.validateTag(dto.name);
        const id = this.getUserIdFromRequest(req);
        const tag = await this.tagRepository.create({ name: dto.name, sortOrder: dto.sortOrder, creator: id });
        return tag;
    }
    async updateTag(dto, id, req) {
        await this.validateTag(dto.name);
        const userId = this.getUserIdFromRequest(req);
        if (userId !== id) {
            throw new common_1.UnauthorizedException({ message: 'Только создатель тэга может изменять тэг' });
        }
        const tag = await this.tagRepository.update(dto, { where: { id: id }, returning: true })
            .then(function (result) {
            return result[1];
        });
        return tag[0];
    }
    async getTagById(id) {
        return await this.tagRepository.findAll({ where: { id: id } });
    }
    async getTagsByIds(tagIds) {
        return await this.tagRepository.findAll({ where: { id: tagIds } });
    }
    async getTags(dto) {
        const arrSortOptions = [];
        const queryObject = {};
        const meta = {};
        if (dto.sortByName || dto.sortByOrder) {
            if (dto.sortByName) {
                arrSortOptions.push(['name', 'ASC']);
            }
            if (dto.sortByOrder) {
                arrSortOptions.push(['sortOrder', 'ASC']);
            }
            Object.assign(queryObject, { order: arrSortOptions });
        }
        if (dto.page) {
            meta['page'] = dto.page;
            Object.assign(queryObject, { offset: dto.page });
        }
        if (dto.pageSize) {
            meta['pageSize'] = dto.pageSize;
            Object.assign(queryObject, { limit: dto.pageSize });
        }
        const { rows, count } = await this.tagRepository.findAndCountAll(queryObject);
        meta['quantity'] = count;
        return { rows, meta };
    }
    async validateTag(name) {
        const tag = await this.tagRepository.findOne({
            where: {
                name: name,
            }
        });
        if (tag) {
            throw new common_2.BadRequestException({ message: 'Данное имя тэга уже есть в базе' });
        }
    }
    getUserIdFromRequest(request) {
        const token = request.headers.authorization.split(' ')[1];
        const decodeObj = this.jwtService.decode(token);
        const { id } = decodeObj;
        return id;
    }
};
TagsService = __decorate([
    (0, common_2.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(tags_model_1.Tag)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], TagsService);
exports.TagsService = TagsService;
//# sourceMappingURL=tags.service.js.map