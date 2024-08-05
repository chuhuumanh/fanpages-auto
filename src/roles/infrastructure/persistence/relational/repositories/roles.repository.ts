import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from '../entities/roles.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Roles } from '../../../../domain/roles';
import { RolesRepository } from '../../roles.repository';
import { RolesMapper } from '../mappers/roles.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class RolesRelationalRepository implements RolesRepository {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  async create(data: Roles): Promise<Roles> {
    const persistenceModel = RolesMapper.toPersistence(data);
    const newEntity = await this.rolesRepository.save(
      this.rolesRepository.create(persistenceModel),
    );
    return RolesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Roles[]> {
    const entities = await this.rolesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => RolesMapper.toDomain(user));
  }

  async findById(id: Roles['id']): Promise<NullableType<Roles>> {
    const entity = await this.rolesRepository.findOne({
      where: { id },
    });

    return entity ? RolesMapper.toDomain(entity) : null;
  }

  async update(id: Roles['id'], payload: Partial<Roles>): Promise<Roles> {
    const entity = await this.rolesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.rolesRepository.save(
      this.rolesRepository.create(
        RolesMapper.toPersistence({
          ...RolesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RolesMapper.toDomain(updatedEntity);
  }

  async remove(id: Roles['id']): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
