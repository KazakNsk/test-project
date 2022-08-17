import { QueryParams } from './dto/query-params.dto';
import { Body, Controller, Post, UseGuards, Req, Get, Param, Query, ValidationPipe, UsePipes, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { Tag } from './tags.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateTagDto } from './dto/update-tag.dto';

@ApiTags('Тэги')
@Controller('tag')
export class TagsController {
    constructor(private tagService: TagsService) {}

    @ApiOperation({summary: 'Создать тэг'})
    @ApiResponse({status: 200, type: Tag})
    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CreateTagDto, @Req() req: Request) {
        return this.tagService.createTag(dto, req);
    }

    @ApiOperation({summary: 'Получить тэг по его id'})
    @ApiResponse({status: 200, type: Tag})
    @UsePipes(ValidationPipe)
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getTagById(@Param('id') id: string) {
        return this.tagService.getTagById(id);
    }

    @ApiOperation({summary: 'Получить тэги'})
    @ApiResponse({status: 200, type: Tag})
    @UsePipes(ValidationPipe)
    @Get()
    @UseGuards(JwtAuthGuard)
    getTags(@Query() reqParam: QueryParams) {
        return this.tagService.getTags(reqParam);
    }

    @ApiOperation({summary: 'Изменить тэг (только создатель тэга)'})
    @ApiResponse({status: 200, type: Tag})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Put(':id')
    update(@Body() tagDto:UpdateTagDto, @Param('id') id: string, @Req() req: Request) {
        return this.tagService.updateTag(tagDto, id, req);
    }
}
