import { Module } from '@nestjs/common';
import { ScheduledTasksRepository } from '../scheduled-tasks.repository';
import { ScheduledTasksRelationalRepository } from './repositories/scheduled-tasks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledTasksEntity } from './entities/scheduled-tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduledTasksEntity])],
  providers: [
    {
      provide: ScheduledTasksRepository,
      useClass: ScheduledTasksRelationalRepository,
    },
  ],
  exports: [ScheduledTasksRepository],
})
export class RelationalScheduledTasksPersistenceModule {}
