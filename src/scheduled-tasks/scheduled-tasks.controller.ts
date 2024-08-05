import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ScheduledTasksService } from './scheduled-tasks.service';
import { CreateScheduledTasksDto } from './dto/create-scheduled-tasks.dto';
import { UpdateScheduledTasksDto } from './dto/update-scheduled-tasks.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ScheduledTasks } from './domain/scheduled-tasks';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllScheduledTasksDto } from './dto/find-all-scheduled-tasks.dto';

@ApiTags('Scheduledtasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'scheduled-tasks',
  version: '1',
})
export class ScheduledTasksController {
  constructor(private readonly scheduledTasksService: ScheduledTasksService) {}

  @Post()
  @ApiCreatedResponse({
    type: ScheduledTasks,
  })
  create(@Body() createScheduledTasksDto: CreateScheduledTasksDto) {
    return this.scheduledTasksService.create(createScheduledTasksDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ScheduledTasks),
  })
  async findAll(
    @Query() query: FindAllScheduledTasksDto,
  ): Promise<InfinityPaginationResponseDto<ScheduledTasks>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.scheduledTasksService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ScheduledTasks,
  })
  findOne(@Param('id') id: string) {
    return this.scheduledTasksService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ScheduledTasks,
  })
  update(
    @Param('id') id: string,
    @Body() updateScheduledTasksDto: UpdateScheduledTasksDto,
  ) {
    return this.scheduledTasksService.update(id, updateScheduledTasksDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.scheduledTasksService.remove(id);
  }
}
