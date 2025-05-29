import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Employee } from './models/employee.model';

@ApiTags('Xodimlar')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi xodim qo‘shish' })
  @ApiResponse({ status: 201, type: Employee })
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha xodimlarni olish' })
  @ApiResponse({ status: 200, type: [Employee] })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'ID bo‘yicha xodimni olish' })
  @ApiResponse({ status: 200, type: Employee })
  findOne(@Param('user_id') user_id: string) {
    return this.employeesService.findOne(+user_id);
  }

  @Patch(':user_id')
  @ApiOperation({ summary: 'ID bo‘yicha xodimni yangilash' })
  update(@Param('user_id') user_id: string, @Body() dto: UpdateEmployeeDto) {
    return this.employeesService.update(+user_id, dto);
  }

  @Delete(':user_id')
  @ApiOperation({ summary: 'ID bo‘yicha xodimni o‘chirish' })
  remove(@Param('user_id') user_id: string) {
    return this.employeesService.remove(+user_id);
  }
}
