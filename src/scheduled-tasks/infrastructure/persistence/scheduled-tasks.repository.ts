import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ScheduledTasks } from '../../domain/scheduled-tasks';

export abstract class ScheduledTasksRepository {
  abstract create(
    data: Omit<ScheduledTasks, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ScheduledTasks>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ScheduledTasks[]>;

  abstract findById(
    id: ScheduledTasks['id'],
  ): Promise<NullableType<ScheduledTasks>>;

  abstract update(
    id: ScheduledTasks['id'],
    payload: DeepPartial<ScheduledTasks>,
  ): Promise<ScheduledTasks | null>;

  abstract remove(id: ScheduledTasks['id']): Promise<void>;
}
