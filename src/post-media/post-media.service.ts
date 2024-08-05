import { Injectable } from '@nestjs/common';
import { CreatePostMediaDto } from './dto/create-post-media.dto';
import { UpdatePostMediaDto } from './dto/update-post-media.dto';
import { PostMediaRepository } from './infrastructure/persistence/post-media.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PostMedia } from './domain/post-media';

@Injectable()
export class PostMediaService {
  constructor(private readonly postMediaRepository: PostMediaRepository) {}

  create(createPostMediaDto: CreatePostMediaDto) {
    return this.postMediaRepository.create(createPostMediaDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.postMediaRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: PostMedia['id']) {
    return this.postMediaRepository.findById(id);
  }

  update(id: PostMedia['id'], updatePostMediaDto: UpdatePostMediaDto) {
    return this.postMediaRepository.update(id, updatePostMediaDto);
  }

  remove(id: PostMedia['id']) {
    return this.postMediaRepository.remove(id);
  }
}
