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
exports.UsersService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
const bcrypt = require("bcryptjs");
const tags_service_1 = require("../tags/tags.service");
let UsersService = class UsersService {
    constructor(userRepository, jwtService, tagsService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.tagsService = tagsService;
    }
    async createUser(dto) {
        const user = await this.userRepository.create(dto);
        return user;
    }
    async updateUser(dto, req) {
        const userId = this.getUserIdFromRequest(req);
        if (dto.email) {
            this.validateByEmail(dto.email);
        }
        if (dto.nickname) {
            this.validateByNickname(dto.nickname);
        }
        if (dto.password) {
            const hashPassword = await bcrypt.hash(dto.password, 5);
            dto = Object.assign(Object.assign({}, dto), { password: hashPassword });
        }
        const user = await this.userRepository.update(dto, { where: { id: userId }, returning: true })
            .then(function (result) {
            return result[1];
        });
        return user[0];
    }
    async deleteUser(req) {
        const userId = this.getUserIdFromRequest(req);
        const count = await this.userRepository.destroy({ where: { id: userId } }).then((result) => result);
        if (count === 1) {
            return;
        }
        else
            throw new common_1.HttpException('Вам нужно удалить токен на фронте:)', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }
    async getUserByNickname(nickname) {
        const user = await this.userRepository.findOne({ where: { nickname } });
        return user;
    }
    async addTag(dto, req) {
        const userId = this.getUserIdFromRequest(req);
        try {
            const user = await this.userRepository.findByPk(userId);
            const tags = await this.tagsService.getTagsByIds(dto.tags);
            if (user && tags) {
                await user.$add('tags', tags);
                return dto;
            }
            throw new common_1.HttpException('Пользователь или тэги не найдены', common_1.HttpStatus.NOT_FOUND);
        }
        catch (e) {
            return new common_1.HttpException({ message: e.message }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateByEmail(email) {
        const candidate = await this.getUserByEmail(email);
        if (candidate) {
            throw new common_1.BadRequestException('Пользователь с такой почтой существует');
        }
    }
    async validateByNickname(nickname) {
        const candidate = await this.getUserByNickname(nickname);
        if (candidate) {
            throw new common_1.BadRequestException('Пользователь с таким никнеймом уже существует');
        }
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({ include: { all: true } });
        return users;
    }
    getUserIdFromRequest(request) {
        const token = request.headers.authorization.split(' ')[1];
        const decodeObj = this.jwtService.decode(token);
        const { id } = decodeObj;
        return id;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService, tags_service_1.TagsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map