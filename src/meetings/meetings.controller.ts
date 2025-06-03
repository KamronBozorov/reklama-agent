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
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Meeting } from './models/meeting.model';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Uchrashuvlar')
@ApiBearerAuth('accessToken')
@Controller('meetings')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class MeetingsController {
  constructor(private readonly service: MeetingsService) {}

  @Post()
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: 'Yangi uchrashuv yaratish' })
  @ApiResponse({ status: 201, type: Meeting })
  create(@Body() dto: CreateMeetingDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('superadmin', 'manager', 'client')
  @ApiOperation({ summary: 'Barcha uchrashuvlarni olish' })
  @ApiResponse({ status: 200, type: [Meeting] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'manager', 'client')
  @ApiOperation({ summary: 'ID orqali uchrashuvni olish' })
  @ApiResponse({ status: 200, type: Meeting })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: 'Uchrashuvni yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdateMeetingDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: "Uchrashuvni o'chirish" })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
