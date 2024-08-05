import { ScheduledTasks } from '../../../../domain/scheduled-tasks';
import { ScheduledTasksEntity } from '../entities/scheduled-tasks.entity';

export class ScheduledTasksMapper {
  static toDomain(raw: ScheduledTasksEntity): ScheduledTasks {
    const domainEntity = new ScheduledTasks();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ScheduledTasks): ScheduledTasksEntity {
    const persistenceEntity = new ScheduledTasksEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
