import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledTasksEntity } from '../entities/scheduled-tasks.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ScheduledTasks } from '../../../../domain/scheduled-tasks';
import { ScheduledTasksRepository } from '../../scheduled-tasks.repository';
import { ScheduledTasksMapper } from '../mappers/scheduled-tasks.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ScheduledTasksRelationalRepository
  implements ScheduledTasksRepository
{
  constructor(
    @InjectRepository(ScheduledTasksEntity)
    private readonly scheduledTasksRepository: Repository<ScheduledTasksEntity>,
  ) {}

  async create(data: ScheduledTasks): Promise<ScheduledTasks> {
    const persistenceModel = ScheduledTasksMapper.toPersistence(data);
    const newEntity = await this.scheduledTasksRepository.save(
      this.scheduledTasksRepository.create(persistenceModel),
    );
    return ScheduledTasksMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ScheduledTasks[]> {
    const entities = await this.scheduledTasksRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => ScheduledTasksMapper.toDomain(user));
  }

  async findById(
    id: ScheduledTasks['id'],
  ): Promise<NullableType<ScheduledTasks>> {
    const entity = await this.scheduledTasksRepository.findOne({
      where: { id },
    });

    return entity ? ScheduledTasksMapper.toDomain(entity) : null;
  }

  async update(
    id: ScheduledTasks['id'],
    payload: Partial<ScheduledTasks>,
  ): Promise<ScheduledTasks> {
    const entity = await this.scheduledTasksRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.scheduledTasksRepository.save(
      this.scheduledTasksRepository.create(
        ScheduledTasksMapper.toPersistence({
          ...ScheduledTasksMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ScheduledTasksMapper.toDomain(updatedEntity);
  }

  async remove(id: ScheduledTasks['id']): Promise<void> {
    await this.scheduledTasksRepository.delete(id);
  }
}
