import { Injectable } from '@nestjs/common';
import { CreateScheduledTasksDto } from './dto/create-scheduled-tasks.dto';
import { UpdateScheduledTasksDto } from './dto/update-scheduled-tasks.dto';
import { ScheduledTasksRepository } from './infrastructure/persistence/scheduled-tasks.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ScheduledTasks } from './domain/scheduled-tasks';

@Injectable()
export class ScheduledTasksService {
  constructor(
    private readonly scheduledTasksRepository: ScheduledTasksRepository,
  ) {}

  create(createScheduledTasksDto: CreateScheduledTasksDto) {
    return this.scheduledTasksRepository.create(createScheduledTasksDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.scheduledTasksRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: ScheduledTasks['id']) {
    return this.scheduledTasksRepository.findById(id);
  }

  update(
    id: ScheduledTasks['id'],
    updateScheduledTasksDto: UpdateScheduledTasksDto,
  ) {
    return this.scheduledTasksRepository.update(id, updateScheduledTasksDto);
  }

  remove(id: ScheduledTasks['id']) {
    return this.scheduledTasksRepository.remove(id);
  }
}
