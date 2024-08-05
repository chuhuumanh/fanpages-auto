import { Fanpages } from '../../../../domain/fanpages';
import { FanpagesEntity } from '../entities/fanpages.entity';

export class FanpagesMapper {
  static toDomain(raw: FanpagesEntity): Fanpages {
    const domainEntity = new Fanpages();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Fanpages): FanpagesEntity {
    const persistenceEntity = new FanpagesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
