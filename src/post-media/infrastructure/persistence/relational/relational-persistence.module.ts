import { Module } from '@nestjs/common';
import { PostMediaRepository } from '../post-media.repository';
import { PostMediaRelationalRepository } from './repositories/post-media.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostMediaEntity } from './entities/post-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostMediaEntity])],
  providers: [
    {
      provide: PostMediaRepository,
      useClass: PostMediaRelationalRepository,
    },
  ],
  exports: [PostMediaRepository],
})
export class RelationalPostMediaPersistenceModule {}
