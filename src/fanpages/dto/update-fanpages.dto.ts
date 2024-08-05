// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateFanpagesDto } from './create-fanpages.dto';

export class UpdateFanpagesDto extends PartialType(CreateFanpagesDto) {}
