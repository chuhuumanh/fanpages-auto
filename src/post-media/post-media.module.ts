import { Module } from '@nestjs/common';
import { PostMediaService } from './post-media.service';
import { PostMediaController } from './post-media.controller';
import { RelationalPostMediaPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalPostMediaPersistenceModule],
  controllers: [PostMediaController],
  providers: [PostMediaService],
  exports: [PostMediaService, RelationalPostMediaPersistenceModule],
})
export class PostMediaModule {}
