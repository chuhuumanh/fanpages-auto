import { Module } from '@nestjs/common';
import { FanpagesService } from './fanpages.service';
import { FanpagesController } from './fanpages.controller';
import { RelationalFanpagesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalFanpagesPersistenceModule],
  controllers: [FanpagesController],
  providers: [FanpagesService],
  exports: [FanpagesService, RelationalFanpagesPersistenceModule],
})
export class FanpagesModule {}
