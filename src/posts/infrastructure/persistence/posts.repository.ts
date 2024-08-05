import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Posts } from '../../domain/posts';

export abstract class PostsRepository {
  abstract create(
    data: Omit<Posts, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Posts>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Posts[]>;

  abstract findById(id: Posts['id']): Promise<NullableType<Posts>>;

  abstract update(
    id: Posts['id'],
    payload: DeepPartial<Posts>,
  ): Promise<Posts | null>;

  abstract remove(id: Posts['id']): Promise<void>;
}
