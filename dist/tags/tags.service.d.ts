import { Request } from 'express';
import { CreateTagDto } from './dto/create-tag.dto';
import { AuthService } from './../auth/auth.service';
import { Tag } from 'src/tags/tags.model';
export declare class TagsService {
    private tagRepository;
    private authService;
    constructor(tagRepository: typeof Tag, authService: AuthService);
    createTag(dto: CreateTagDto, req: Request): Promise<Tag>;
}
