import { PostMedia } from '../../../../domain/post-media';
import { PostMediaEntity } from '../entities/post-media.entity';

export class PostMediaMapper {
  static toDomain(raw: PostMediaEntity): PostMedia {
    const domainEntity = new PostMedia();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: PostMedia): PostMediaEntity {
    const persistenceEntity = new PostMediaEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
