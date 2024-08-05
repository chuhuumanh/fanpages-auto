import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FanpagesEntity } from '../entities/fanpages.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Fanpages } from '../../../../domain/fanpages';
import { FanpagesRepository } from '../../fanpages.repository';
import { FanpagesMapper } from '../mappers/fanpages.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class FanpagesRelationalRepository implements FanpagesRepository {
  constructor(
    @InjectRepository(FanpagesEntity)
    private readonly fanpagesRepository: Repository<FanpagesEntity>,
  ) {}

  async create(data: Fanpages): Promise<Fanpages> {
    const persistenceModel = FanpagesMapper.toPersistence(data);
    const newEntity = await this.fanpagesRepository.save(
      this.fanpagesRepository.create(persistenceModel),
    );
    return FanpagesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Fanpages[]> {
    const entities = await this.fanpagesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => FanpagesMapper.toDomain(user));
  }

  async findById(id: Fanpages['id']): Promise<NullableType<Fanpages>> {
    const entity = await this.fanpagesRepository.findOne({
      where: { id },
    });

    return entity ? FanpagesMapper.toDomain(entity) : null;
  }

  async update(
    id: Fanpages['id'],
    payload: Partial<Fanpages>,
  ): Promise<Fanpages> {
    const entity = await this.fanpagesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.fanpagesRepository.save(
      this.fanpagesRepository.create(
        FanpagesMapper.toPersistence({
          ...FanpagesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return FanpagesMapper.toDomain(updatedEntity);
  }

  async remove(id: Fanpages['id']): Promise<void> {
    await this.fanpagesRepository.delete(id);
  }
}
