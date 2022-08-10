import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { UserTag } from 'src/users/users-tags.model';
import { User } from 'src/users/users.model';
import { TagsController } from './tags.controller';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [
      AuthModule,
      SequelizeModule.forFeature([Tag, User, UserTag])
  ],
})
export class TagsModule {}
