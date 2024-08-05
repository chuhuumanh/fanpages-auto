import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PostMedia } from '../../domain/post-media';

export abstract class PostMediaRepository {
  abstract create(
    data: Omit<PostMedia, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostMedia>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PostMedia[]>;

  abstract findById(id: PostMedia['id']): Promise<NullableType<PostMedia>>;

  abstract update(
    id: PostMedia['id'],
    payload: DeepPartial<PostMedia>,
  ): Promise<PostMedia | null>;

  abstract remove(id: PostMedia['id']): Promise<void>;
}
