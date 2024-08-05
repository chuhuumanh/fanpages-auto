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
import { PostMediaService } from './post-media.service';
import { CreatePostMediaDto } from './dto/create-post-media.dto';
import { UpdatePostMediaDto } from './dto/update-post-media.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PostMedia } from './domain/post-media';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllPostMediaDto } from './dto/find-all-post-media.dto';

@ApiTags('Postmedia')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'post-media',
  version: '1',
})
export class PostMediaController {
  constructor(private readonly postMediaService: PostMediaService) {}

  @Post()
  @ApiCreatedResponse({
    type: PostMedia,
  })
  create(@Body() createPostMediaDto: CreatePostMediaDto) {
    return this.postMediaService.create(createPostMediaDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(PostMedia),
  })
  async findAll(
    @Query() query: FindAllPostMediaDto,
  ): Promise<InfinityPaginationResponseDto<PostMedia>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.postMediaService.findAllWithPagination({
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
    type: PostMedia,
  })
  findOne(@Param('id') id: string) {
    return this.postMediaService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: PostMedia,
  })
  update(
    @Param('id') id: string,
    @Body() updatePostMediaDto: UpdatePostMediaDto,
  ) {
    return this.postMediaService.update(id, updatePostMediaDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.postMediaService.remove(id);
  }
}
