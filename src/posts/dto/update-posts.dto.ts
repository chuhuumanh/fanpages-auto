// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreatePostsDto } from './create-posts.dto';

export class UpdatePostsDto extends PartialType(CreatePostsDto) {}
