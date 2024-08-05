import { Injectable } from '@nestjs/common';
import { CreateFanpagesDto } from './dto/create-fanpages.dto';
import { UpdateFanpagesDto } from './dto/update-fanpages.dto';
import { FanpagesRepository } from './infrastructure/persistence/fanpages.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Fanpages } from './domain/fanpages';

@Injectable()
export class FanpagesService {
  constructor(private readonly fanpagesRepository: FanpagesRepository) {}

  create(createFanpagesDto: CreateFanpagesDto) {
    return this.fanpagesRepository.create(createFanpagesDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.fanpagesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Fanpages['id']) {
    return this.fanpagesRepository.findById(id);
  }

  update(id: Fanpages['id'], updateFanpagesDto: UpdateFanpagesDto) {
    return this.fanpagesRepository.update(id, updateFanpagesDto);
  }

  remove(id: Fanpages['id']) {
    return this.fanpagesRepository.remove(id);
  }
}
