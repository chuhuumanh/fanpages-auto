import { Logs } from '../../../../domain/logs';
import { LogsEntity } from '../entities/logs.entity';

export class LogsMapper {
  static toDomain(raw: LogsEntity): Logs {
    const domainEntity = new Logs();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Logs): LogsEntity {
    const persistenceEntity = new LogsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
