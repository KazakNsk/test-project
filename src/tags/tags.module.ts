import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
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
      JwtModule,
      SequelizeModule.forFeature([Tag, User, UserTag])
  ],
  exports: [TagsService]
})
export class TagsModule {}
