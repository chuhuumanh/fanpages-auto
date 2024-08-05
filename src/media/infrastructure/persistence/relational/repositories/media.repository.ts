import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaEntity } from '../entities/media.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Media } from '../../../../domain/media';
import { MediaRepository } from '../../media.repository';
import { MediaMapper } from '../mappers/media.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class MediaRelationalRepository implements MediaRepository {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
  ) {}

  async create(data: Media): Promise<Media> {
    const persistenceModel = MediaMapper.toPersistence(data);
    const newEntity = await this.mediaRepository.save(
      this.mediaRepository.create(persistenceModel),
    );
    return MediaMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Media[]> {
    const entities = await this.mediaRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => MediaMapper.toDomain(user));
  }

  async findById(id: Media['id']): Promise<NullableType<Media>> {
    const entity = await this.mediaRepository.findOne({
      where: { id },
    });

    return entity ? MediaMapper.toDomain(entity) : null;
  }

  async update(id: Media['id'], payload: Partial<Media>): Promise<Media> {
    const entity = await this.mediaRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.mediaRepository.save(
      this.mediaRepository.create(
        MediaMapper.toPersistence({
          ...MediaMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return MediaMapper.toDomain(updatedEntity);
  }

  async remove(id: Media['id']): Promise<void> {
    await this.mediaRepository.delete(id);
  }
}
