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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Employee } from './models/employee.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SelfGuard } from '../common/guards/self.guard';

@ApiTags('Xodimlar')
@ApiBearerAuth('accessToken')
@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @Roles('superadmin', 'manager')
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: "Yangi xodim qo'shish" })
  @ApiResponse({ status: 201, type: Employee })
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Get()
  @Roles('superadmin', 'manager', 'analyst')
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Barcha xodimlarni olish' })
  @ApiResponse({ status: 200, type: [Employee] })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':user_id')
  @UseGuards(SelfGuard)
  @ApiOperation({ summary: "ID bo'yicha xodimni olish" })
  @ApiResponse({ status: 200, type: Employee })
  findOne(@Param('user_id') user_id: string) {
    return this.employeesService.findOne(+user_id);
  }

  @Patch(':user_id')
  @UseGuards(SelfGuard)
  @ApiOperation({ summary: "ID bo'yicha xodimni yangilash" })
  @ApiResponse({ status: 200, type: Employee })
  update(@Param('user_id') user_id: string, @Body() dto: UpdateEmployeeDto) {
    return this.employeesService.update(+user_id, dto);
  }

  @Delete(':user_id')
  @UseGuards(SelfGuard)
  @ApiOperation({ summary: "ID bo'yicha xodimni o'chirish" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli o'chirildi" })
  remove(@Param('user_id') user_id: string) {
    return this.employeesService.remove(+user_id);
  }
}
