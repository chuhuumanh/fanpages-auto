import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaRepository } from './infrastructure/persistence/media.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Media } from './domain/media';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  create(createMediaDto: CreateMediaDto) {
    return this.mediaRepository.create(createMediaDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.mediaRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Media['id']) {
    return this.mediaRepository.findById(id);
  }

  update(id: Media['id'], updateMediaDto: UpdateMediaDto) {
    return this.mediaRepository.update(id, updateMediaDto);
  }

  remove(id: Media['id']) {
    return this.mediaRepository.remove(id);
  }
}
