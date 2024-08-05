import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { RelationalMediaPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalMediaPersistenceModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService, RelationalMediaPersistenceModule],
})
export class MediaModule {}
