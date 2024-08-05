import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Media } from '../../domain/media';

export abstract class MediaRepository {
  abstract create(
    data: Omit<Media, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Media>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Media[]>;

  abstract findById(id: Media['id']): Promise<NullableType<Media>>;

  abstract update(
    id: Media['id'],
    payload: DeepPartial<Media>,
  ): Promise<Media | null>;

  abstract remove(id: Media['id']): Promise<void>;
}
