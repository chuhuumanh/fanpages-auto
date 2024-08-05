import { Injectable } from '@nestjs/common';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { UpdateCommentsDto } from './dto/update-comments.dto';
import { CommentsRepository } from './infrastructure/persistence/comments.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Comments } from './domain/comments';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  create(createCommentsDto: CreateCommentsDto) {
    return this.commentsRepository.create(createCommentsDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.commentsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Comments['id']) {
    return this.commentsRepository.findById(id);
  }

  update(id: Comments['id'], updateCommentsDto: UpdateCommentsDto) {
    return this.commentsRepository.update(id, updateCommentsDto);
  }

  remove(id: Comments['id']) {
    return this.commentsRepository.remove(id);
  }
}
