import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { RelationalLogsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalLogsPersistenceModule],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService, RelationalLogsPersistenceModule],
})
export class LogsModule {}
