import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogsEntity } from '../entities/logs.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Logs } from '../../../../domain/logs';
import { LogsRepository } from '../../logs.repository';
import { LogsMapper } from '../mappers/logs.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class LogsRelationalRepository implements LogsRepository {
  constructor(
    @InjectRepository(LogsEntity)
    private readonly logsRepository: Repository<LogsEntity>,
  ) {}

  async create(data: Logs): Promise<Logs> {
    const persistenceModel = LogsMapper.toPersistence(data);
    const newEntity = await this.logsRepository.save(
      this.logsRepository.create(persistenceModel),
    );
    return LogsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Logs[]> {
    const entities = await this.logsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => LogsMapper.toDomain(user));
  }

  async findById(id: Logs['id']): Promise<NullableType<Logs>> {
    const entity = await this.logsRepository.findOne({
      where: { id },
    });

    return entity ? LogsMapper.toDomain(entity) : null;
  }

  async update(id: Logs['id'], payload: Partial<Logs>): Promise<Logs> {
    const entity = await this.logsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.logsRepository.save(
      this.logsRepository.create(
        LogsMapper.toPersistence({
          ...LogsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return LogsMapper.toDomain(updatedEntity);
  }

  async remove(id: Logs['id']): Promise<void> {
    await this.logsRepository.delete(id);
  }
}
