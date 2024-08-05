import { Injectable } from '@nestjs/common';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update-posts.dto';
import { PostsRepository } from './infrastructure/persistence/posts.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Posts } from './domain/posts';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  create(createPostsDto: CreatePostsDto) {
    return this.postsRepository.create(createPostsDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.postsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Posts['id']) {
    return this.postsRepository.findById(id);
  }

  update(id: Posts['id'], updatePostsDto: UpdatePostsDto) {
    return this.postsRepository.update(id, updatePostsDto);
  }

  remove(id: Posts['id']) {
    return this.postsRepository.remove(id);
  }
}
