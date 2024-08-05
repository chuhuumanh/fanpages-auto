import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostMediaEntity } from '../entities/post-media.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { PostMedia } from '../../../../domain/post-media';
import { PostMediaRepository } from '../../post-media.repository';
import { PostMediaMapper } from '../mappers/post-media.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PostMediaRelationalRepository implements PostMediaRepository {
  constructor(
    @InjectRepository(PostMediaEntity)
    private readonly postMediaRepository: Repository<PostMediaEntity>,
  ) {}

  async create(data: PostMedia): Promise<PostMedia> {
    const persistenceModel = PostMediaMapper.toPersistence(data);
    const newEntity = await this.postMediaRepository.save(
      this.postMediaRepository.create(persistenceModel),
    );
    return PostMediaMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PostMedia[]> {
    const entities = await this.postMediaRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => PostMediaMapper.toDomain(user));
  }

  async findById(id: PostMedia['id']): Promise<NullableType<PostMedia>> {
    const entity = await this.postMediaRepository.findOne({
      where: { id },
    });

    return entity ? PostMediaMapper.toDomain(entity) : null;
  }

  async update(
    id: PostMedia['id'],
    payload: Partial<PostMedia>,
  ): Promise<PostMedia> {
    const entity = await this.postMediaRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.postMediaRepository.save(
      this.postMediaRepository.create(
        PostMediaMapper.toPersistence({
          ...PostMediaMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PostMediaMapper.toDomain(updatedEntity);
  }

  async remove(id: PostMedia['id']): Promise<void> {
    await this.postMediaRepository.delete(id);
  }
}
