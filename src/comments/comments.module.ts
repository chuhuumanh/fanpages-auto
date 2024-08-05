import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { RelationalCommentsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalCommentsPersistenceModule],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService, RelationalCommentsPersistenceModule],
})
export class CommentsModule {}
