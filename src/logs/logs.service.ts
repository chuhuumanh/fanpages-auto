import { Injectable } from '@nestjs/common';
import { CreateLogsDto } from './dto/create-logs.dto';
import { UpdateLogsDto } from './dto/update-logs.dto';
import { LogsRepository } from './infrastructure/persistence/logs.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Logs } from './domain/logs';

@Injectable()
export class LogsService {
  constructor(private readonly logsRepository: LogsRepository) {}

  create(createLogsDto: CreateLogsDto) {
    return this.logsRepository.create(createLogsDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.logsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Logs['id']) {
    return this.logsRepository.findById(id);
  }

  update(id: Logs['id'], updateLogsDto: UpdateLogsDto) {
    return this.logsRepository.update(id, updateLogsDto);
  }

  remove(id: Logs['id']) {
    return this.logsRepository.remove(id);
  }
}
