import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsEntity } from '../entities/posts.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Posts } from '../../../../domain/posts';
import { PostsRepository } from '../../posts.repository';
import { PostsMapper } from '../mappers/posts.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PostsRelationalRepository implements PostsRepository {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  async create(data: Posts): Promise<Posts> {
    const persistenceModel = PostsMapper.toPersistence(data);
    const newEntity = await this.postsRepository.save(
      this.postsRepository.create(persistenceModel),
    );
    return PostsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Posts[]> {
    const entities = await this.postsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((user) => PostsMapper.toDomain(user));
  }

  async findById(id: Posts['id']): Promise<NullableType<Posts>> {
    const entity = await this.postsRepository.findOne({
      where: { id },
    });

    return entity ? PostsMapper.toDomain(entity) : null;
  }

  async update(id: Posts['id'], payload: Partial<Posts>): Promise<Posts> {
    const entity = await this.postsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.postsRepository.save(
      this.postsRepository.create(
        PostsMapper.toPersistence({
          ...PostsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PostsMapper.toDomain(updatedEntity);
  }

  async remove(id: Posts['id']): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
