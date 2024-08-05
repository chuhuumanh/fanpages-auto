import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { RelationalPostsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalPostsPersistenceModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService, RelationalPostsPersistenceModule],
})
export class PostsModule {}
