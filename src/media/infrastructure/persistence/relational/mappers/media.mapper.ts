import { Media } from '../../../../domain/media';
import { MediaEntity } from '../entities/media.entity';

export class MediaMapper {
  static toDomain(raw: MediaEntity): Media {
    const domainEntity = new Media();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Media): MediaEntity {
    const persistenceEntity = new MediaEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
