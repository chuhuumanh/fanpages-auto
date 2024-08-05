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
import { LogsService } from './logs.service';
import { CreateLogsDto } from './dto/create-logs.dto';
import { UpdateLogsDto } from './dto/update-logs.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Logs } from './domain/logs';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllLogsDto } from './dto/find-all-logs.dto';

@ApiTags('Logs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'logs',
  version: '1',
})
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Logs,
  })
  create(@Body() createLogsDto: CreateLogsDto) {
    return this.logsService.create(createLogsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Logs),
  })
  async findAll(
    @Query() query: FindAllLogsDto,
  ): Promise<InfinityPaginationResponseDto<Logs>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.logsService.findAllWithPagination({
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
    type: Logs,
  })
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Logs,
  })
  update(@Param('id') id: string, @Body() updateLogsDto: UpdateLogsDto) {
    return this.logsService.update(id, updateLogsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.logsService.remove(id);
  }
}
