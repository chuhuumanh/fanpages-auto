import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Logs } from '../../domain/logs';

export abstract class LogsRepository {
  abstract create(
    data: Omit<Logs, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Logs>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Logs[]>;

  abstract findById(id: Logs['id']): Promise<NullableType<Logs>>;

  abstract update(
    id: Logs['id'],
    payload: DeepPartial<Logs>,
  ): Promise<Logs | null>;

  abstract remove(id: Logs['id']): Promise<void>;
}
