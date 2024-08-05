// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateLogsDto } from './create-logs.dto';

export class UpdateLogsDto extends PartialType(CreateLogsDto) {}
