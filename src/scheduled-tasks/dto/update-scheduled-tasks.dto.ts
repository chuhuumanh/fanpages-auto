// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateScheduledTasksDto } from './create-scheduled-tasks.dto';

export class UpdateScheduledTasksDto extends PartialType(
  CreateScheduledTasksDto,
) {}
