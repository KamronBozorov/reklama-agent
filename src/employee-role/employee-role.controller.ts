import { Controller, Post, Delete, Body, Query } from '@nestjs/common';
import { EmployeeRoleService } from './employee-role.service';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Xodim va rollar')
@Controller('employee-role')
export class EmployeeRoleController {
  constructor(private readonly employeeRoleService: EmployeeRoleService) {}

  @Post()
  @ApiOperation({ summary: 'Xodimga rol biriktirish' })
  assignRole(@Body() dto: CreateEmployeeRoleDto) {
    return this.employeeRoleService.assignRole(dto);
  }

  @Delete()
  @ApiOperation({ summary: 'Xodimdan rolni olib tashlash' })
  @ApiQuery({ name: 'employee_id', type: Number })
  @ApiQuery({ name: 'role_id', type: Number })
  removeRole(
    @Query('employee_id') employee_id: number,
    @Query('role_id') role_id: number,
  ) {
    return this.employeeRoleService.removeRole(+employee_id, +role_id);
  }
}
