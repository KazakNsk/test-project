import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Tag } from 'src/tags/tags.model';
import { UserTag } from './users-tags.model';
import { TagsModule } from 'src/tags/tags.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        forwardRef(() => AuthModule),
        TagsModule,
        SequelizeModule.forFeature([User, Tag, UserTag])
    ],
    exports: [UsersService]
})
export class UsersModule {}