import { Request } from 'express';
import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtService } from '@nestjs/jwt';
import { Tag } from 'src/tags/tags.model';
import { QueryParams } from './dto/query-params.dto';
export declare class TagsService {
    private tagRepository;
    private jwtService;
    constructor(tagRepository: typeof Tag, jwtService: JwtService);
    createTag(dto: CreateTagDto, req: Request): Promise<Tag>;
    updateTag(dto: UpdateTagDto, id: string, req: Request): Promise<Tag>;
    getTagById(id: any): Promise<Tag[]>;
    getTagsByIds(tagIds: Array<number>): Promise<Tag[]>;
    getTags(dto: QueryParams): Promise<{
        rows: Tag[];
        meta: {};
    }>;
    private validateTag;
    getUserIdFromRequest(request: Request): any;
}
