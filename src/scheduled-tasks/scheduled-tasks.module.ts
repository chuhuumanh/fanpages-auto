import { Module } from '@nestjs/common';
import { ScheduledTasksService } from './scheduled-tasks.service';
import { ScheduledTasksController } from './scheduled-tasks.controller';
import { RelationalScheduledTasksPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalScheduledTasksPersistenceModule],
  controllers: [ScheduledTasksController],
  providers: [ScheduledTasksService],
  exports: [ScheduledTasksService, RelationalScheduledTasksPersistenceModule],
})
export class ScheduledTasksModule {}
