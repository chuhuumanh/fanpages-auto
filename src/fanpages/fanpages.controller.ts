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
import { FanpagesService } from './fanpages.service';
import { CreateFanpagesDto } from './dto/create-fanpages.dto';
import { UpdateFanpagesDto } from './dto/update-fanpages.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Fanpages } from './domain/fanpages';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllFanpagesDto } from './dto/find-all-fanpages.dto';

@ApiTags('Fanpages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'fanpages',
  version: '1',
})
export class FanpagesController {
  constructor(private readonly fanpagesService: FanpagesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Fanpages,
  })
  create(@Body() createFanpagesDto: CreateFanpagesDto) {
    return this.fanpagesService.create(createFanpagesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Fanpages),
  })
  async findAll(
    @Query() query: FindAllFanpagesDto,
  ): Promise<InfinityPaginationResponseDto<Fanpages>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.fanpagesService.findAllWithPagination({
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
    type: Fanpages,
  })
  findOne(@Param('id') id: string) {
    return this.fanpagesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Fanpages,
  })
  update(
    @Param('id') id: string,
    @Body() updateFanpagesDto: UpdateFanpagesDto,
  ) {
    return this.fanpagesService.update(id, updateFanpagesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.fanpagesService.remove(id);
  }
}
