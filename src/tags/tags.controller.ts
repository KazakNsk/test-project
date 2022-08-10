import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Тэги')
@Controller('tags')
export class TagsController {
    constructor(private tagService: TagsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CreateTagDto, @Req() req: Request) {
        return this.tagService.createTag(dto, req);
     }
}
