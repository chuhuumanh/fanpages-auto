import { Module } from '@nestjs/common';
import { LogsRepository } from '../logs.repository';
import { LogsRelationalRepository } from './repositories/logs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsEntity } from './entities/logs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogsEntity])],
  providers: [
    {
      provide: LogsRepository,
      useClass: LogsRelationalRepository,
    },
  ],
  exports: [LogsRepository],
})
export class RelationalLogsPersistenceModule {}
