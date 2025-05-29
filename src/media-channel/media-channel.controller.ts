import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MediaChannelsService } from './media-channel.service';
import { CreateMediaChannelDto } from './dto/create-media-channel.dto';
import { UpdateMediaChannelDto } from './dto/update-media-channel.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { MediaChannel } from './models/media-channel.model';

@ApiTags('Media Channels')
@Controller('media-channels')
export class MediaChannelsController {
  constructor(private readonly service: MediaChannelsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi media kanal yaratish' })
  @ApiBody({ type: CreateMediaChannelDto })
  @ApiResponse({ status: 201, type: MediaChannel })
  create(@Body() dto: CreateMediaChannelDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha media kanallarni olish' })
  @ApiResponse({ status: 200, type: [MediaChannel] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali media kanal olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: MediaChannel })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Media kanalni yangilash' })
  @ApiBody({ type: UpdateMediaChannelDto })
  update(@Param('id') id: string, @Body() dto: UpdateMediaChannelDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Media kanalni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
