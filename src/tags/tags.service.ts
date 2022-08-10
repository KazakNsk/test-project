import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { CreateTagDto } from './dto/create-tag.dto';

import { AuthService } from './../auth/auth.service';
import { Tag } from 'src/tags/tags.model';

@Injectable()
export class TagsService {

    constructor(
        @InjectModel(Tag) private tagRepository: typeof Tag,
        private authService: AuthService) {}

    async createTag(dto:CreateTagDto, req: Request) {
        const userId = this.authService.getUserIdFromRequest(req);
        const tag = await this.tagRepository.create({name:dto.name, creator:userId});
        return tag;
    }
}
