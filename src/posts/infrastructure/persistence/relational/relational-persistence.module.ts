import { Module } from '@nestjs/common';
import { PostsRepository } from '../posts.repository';
import { PostsRelationalRepository } from './repositories/posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entities/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])],
  providers: [
    {
      provide: PostsRepository,
      useClass: PostsRelationalRepository,
    },
  ],
  exports: [PostsRepository],
})
export class RelationalPostsPersistenceModule {}
