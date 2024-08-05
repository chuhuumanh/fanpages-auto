import { Posts } from '../../../../domain/posts';
import { PostsEntity } from '../entities/posts.entity';

export class PostsMapper {
  static toDomain(raw: PostsEntity): Posts {
    const domainEntity = new Posts();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Posts): PostsEntity {
    const persistenceEntity = new PostsEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
