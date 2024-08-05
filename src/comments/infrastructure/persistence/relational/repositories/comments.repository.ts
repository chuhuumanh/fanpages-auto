import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../entities/comments.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Comments } from '../../../../domain/comments';
import { CommentsRepository } from '../../comments.repository';
import { CommentsMapper } from '../mappers/comments.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class CommentsRelationalRepository implements CommentsRepository {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
  ) {}

  async create(data: Comments): Promise<Comments> {
    const persistenceModel = CommentsMapper.toPersistence(data);
    const newEntity = await this.commentsRepository.save(
      this.commentsRepository.create(persistenceModel),
    );
    return CommentsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Comments[]> {
    const entities = await this.commentsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => CommentsMapper.toDomain(user));
  }

  async findById(id: Comments['id']): Promise<NullableType<Comments>> {
    const entity = await this.commentsRepository.findOne({
      where: { id },
    });

    return entity ? CommentsMapper.toDomain(entity) : null;
  }

  async update(
    id: Comments['id'],
    payload: Partial<Comments>,
  ): Promise<Comments> {
    const entity = await this.commentsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.commentsRepository.save(
      this.commentsRepository.create(
        CommentsMapper.toPersistence({
          ...CommentsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return CommentsMapper.toDomain(updatedEntity);
  }

  async remove(id: Comments['id']): Promise<void> {
    await this.commentsRepository.delete(id);
  }
}
