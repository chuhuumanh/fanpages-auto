import { Roles } from '../../../../domain/roles';
import { RolesEntity } from '../entities/roles.entity';

export class RolesMapper {
  static toDomain(raw: RolesEntity): Roles {
    const domainEntity = new Roles();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Roles): RolesEntity {
    const persistenceEntity = new RolesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
