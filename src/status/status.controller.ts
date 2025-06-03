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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Status } from './models/status.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Use } from 'nestjs-telegraf';
import { RoleGuard } from 'src/common/guards/role.guard';

@ApiTags('Status')
@Controller('status')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi status yaratish' })
  @ApiResponse({ status: 201, type: Status })
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha statuslarni olish' })
  @ApiResponse({ status: 200, type: [Status] })
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha statusni olish' })
  @ApiResponse({ status: 200, type: Status })
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha statusni yangilash' })
  @ApiResponse({ status: 200, type: Status })
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha statusni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Status muvaffaqiyatli o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
