import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MediaChannel } from './models/media-channel.model';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Media Channels')
@ApiBearerAuth('accessToken')
@Controller('media-channels')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class MediaChannelsController {
  constructor(private readonly service: MediaChannelsService) {}

  @Post()
  @Roles('superadmin', 'manager', 'media_buyer')
  @ApiOperation({ summary: 'Yangi media kanal yaratish' })
  @ApiBody({ type: CreateMediaChannelDto })
  @ApiResponse({ status: 201, type: MediaChannel })
  create(@Body() dto: CreateMediaChannelDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('superadmin', 'manager', 'media_buyer', 'analyst')
  @ApiOperation({ summary: 'Barcha media kanallarni olish' })
  @ApiResponse({ status: 200, type: [MediaChannel] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'manager', 'media_buyer', 'analyst')
  @ApiOperation({ summary: 'ID orqali media kanal olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: MediaChannel })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin', 'manager', 'media_buyer')
  @ApiOperation({ summary: 'Media kanalni yangilash' })
  @ApiBody({ type: UpdateMediaChannelDto })
  update(@Param('id') id: string, @Body() dto: UpdateMediaChannelDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: 'Media kanalni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
