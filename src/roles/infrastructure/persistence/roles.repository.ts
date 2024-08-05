import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Roles } from '../../domain/roles';

export abstract class RolesRepository {
  abstract create(
    data: Omit<Roles, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Roles>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Roles[]>;

  abstract findById(id: Roles['id']): Promise<NullableType<Roles>>;

  abstract update(
    id: Roles['id'],
    payload: DeepPartial<Roles>,
  ): Promise<Roles | null>;

  abstract remove(id: Roles['id']): Promise<void>;
}
