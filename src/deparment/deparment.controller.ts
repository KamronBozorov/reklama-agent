import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartmentsService } from './deparment.service';
import { CreateDepartmentDto } from './dto/create-deparment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Department } from './models/deparment.model';
import { UpdateDeparmentDto } from './dto/update-deparment.dto';

@ApiTags('Bo‘limlar')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi bo‘lim qo‘shish' })
  @ApiResponse({ status: 201, type: Department })
  create(@Body() dto: CreateDepartmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha bo‘limlarni olish' })
  @ApiResponse({ status: 200, type: [Department] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bo‘limni ID orqali olish' })
  @ApiResponse({ status: 200, type: Department })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Bo‘limni yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdateDeparmentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Bo‘limni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
