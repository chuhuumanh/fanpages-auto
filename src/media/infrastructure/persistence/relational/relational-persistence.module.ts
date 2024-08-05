import { Module } from '@nestjs/common';
import { MediaRepository } from '../media.repository';
import { MediaRelationalRepository } from './repositories/media.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity])],
  providers: [
    {
      provide: MediaRepository,
      useClass: MediaRelationalRepository,
    },
  ],
  exports: [MediaRepository],
})
export class RelationalMediaPersistenceModule {}
