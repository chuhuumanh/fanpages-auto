import { Injectable } from '@nestjs/common';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { RolesRepository } from './infrastructure/persistence/roles.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Roles } from './domain/roles';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  create(createRolesDto: CreateRolesDto) {
    return this.rolesRepository.create(createRolesDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.rolesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Roles['id']) {
    return this.rolesRepository.findById(id);
  }

  update(id: Roles['id'], updateRolesDto: UpdateRolesDto) {
    return this.rolesRepository.update(id, updateRolesDto);
  }

  remove(id: Roles['id']) {
    return this.rolesRepository.remove(id);
  }
}
