import { UnauthorizedException } from '@nestjs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';

import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtService } from '@nestjs/jwt';
import { Tag } from 'src/tags/tags.model';;
import { QueryParams } from './dto/query-params.dto';

@Injectable()
export class TagsService {

    constructor(
        @InjectModel(Tag) private tagRepository: typeof Tag,
        private jwtService: JwtService) {}

    async createTag(dto:CreateTagDto, req: Request) {
        await this.validateTag(dto.name);
        const id = this.getUserIdFromRequest(req);
        const tag = await this.tagRepository.create({name:dto.name, sortOrder:dto.sortOrder, creator:id});
        return tag;
    }

    async updateTag(dto: UpdateTagDto, id: string, req: Request) {
        await this.validateTag(dto.name);
        const userId = this.getUserIdFromRequest(req);
        if (userId !== id) {
            throw new UnauthorizedException({message:'Только создатель тэга может изменять тэг'})
        }
        const tag = await this.tagRepository.update(dto, {where: {id:id}, returning:true})
        .then(function (result) {
            return result[1]
          });
        return tag[0];  
    }
    
    async getTagById(id) {
        return await this.tagRepository.findAll({where:{id:id}})
    }

    async getTagsByIds(tagIds : Array<number>) {
        return await this.tagRepository.findAll({where:{id: tagIds}})
    }

    async getTags(dto: QueryParams) {
        const arrSortOptions = []
        const queryObject = {}
        const meta = {}
        if (dto.sortByName || dto.sortByOrder) {
            if  (dto.sortByName) {
                arrSortOptions.push(['name', 'ASC'])
            }
            if (dto.sortByOrder) {
                arrSortOptions.push(['sortOrder', 'ASC'])
            }
            Object.assign(queryObject, {order:arrSortOptions})
        }
        if (dto.page) {
            meta['page'] = dto.page
            Object.assign(queryObject, {offset:dto.page})
        }
        if (dto.pageSize) {
            meta['pageSize'] = dto.pageSize
            Object.assign(queryObject, {limit:dto.pageSize})
        }
        const {rows, count} =  await this.tagRepository.findAndCountAll(queryObject)
        meta['quantity'] = count
        return {rows, meta};
    }

    private async validateTag(name) {
        const tag = await this.tagRepository.findOne({
            where: {
            name: name,
            }
        });            
        if (tag) {
            throw new BadRequestException({message:'Данное имя тэга уже есть в базе'})
        }
    }

    getUserIdFromRequest(request:Request) {
        const token = request.headers.authorization.split(' ')[1];
        const decodeObj : {[key: string]: any} = this.jwtService.decode(token) as {[key: string]: any};
        const {id} = decodeObj
        return id
    }
}