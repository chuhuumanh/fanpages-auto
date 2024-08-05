import { Module } from '@nestjs/common';
import { FanpagesRepository } from '../fanpages.repository';
import { FanpagesRelationalRepository } from './repositories/fanpages.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FanpagesEntity } from './entities/fanpages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FanpagesEntity])],
  providers: [
    {
      provide: FanpagesRepository,
      useClass: FanpagesRelationalRepository,
    },
  ],
  exports: [FanpagesRepository],
})
export class RelationalFanpagesPersistenceModule {}
