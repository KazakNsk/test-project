import { QueryParams } from './dto/query-params.dto';
import { Request } from 'express';
import { Tag } from './tags.model';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagsController {
    private tagService;
    constructor(tagService: TagsService);
    create(dto: CreateTagDto, req: Request): Promise<Tag>;
    getTagById(id: string): Promise<Tag[]>;
    getTags(reqParam: QueryParams): Promise<{
        rows: Tag[];
        meta: {};
    }>;
    update(tagDto: UpdateTagDto, id: string, req: Request): Promise<Tag>;
}
