import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Meeting } from './models/meeting.model';

@ApiTags('Meetings')
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly service: MeetingsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi uchrashuv yaratish' })
  @ApiResponse({ status: 201, type: Meeting })
  create(@Body() dto: CreateMeetingDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha uchrashuvlar' })
  @ApiResponse({ status: 200, type: [Meeting] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali uchrashuv olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: Meeting })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Uchrashuvni yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdateMeetingDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Uchrashuvni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
