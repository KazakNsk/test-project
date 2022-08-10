import { Request } from 'express';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
export declare class TagsController {
    private tagService;
    constructor(tagService: TagsService);
    create(dto: CreateTagDto, req: Request): Promise<import("./tags.model").Tag>;
}
