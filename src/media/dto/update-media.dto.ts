// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './create-media.dto';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {}
