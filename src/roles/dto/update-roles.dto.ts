// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateRolesDto } from './create-roles.dto';

export class UpdateRolesDto extends PartialType(CreateRolesDto) {}
