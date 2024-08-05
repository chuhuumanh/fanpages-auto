import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Fanpages } from '../../domain/fanpages';

export abstract class FanpagesRepository {
  abstract create(
    data: Omit<Fanpages, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Fanpages>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Fanpages[]>;

  abstract findById(id: Fanpages['id']): Promise<NullableType<Fanpages>>;

  abstract update(
    id: Fanpages['id'],
    payload: DeepPartial<Fanpages>,
  ): Promise<Fanpages | null>;

  abstract remove(id: Fanpages['id']): Promise<void>;
}
