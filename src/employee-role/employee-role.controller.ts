import {
  Controller,
  Post,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeRoleService } from './employee-role.service';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Xodim va rollar')
@UseGuards(RoleGuard)
@Controller('employee-role')
@UseGuards(JwtAuthGuard)
export class EmployeeRoleController {
  constructor(private readonly employeeRoleService: EmployeeRoleService) {}

  @Post()
  @Roles('superadmin')
  @ApiOperation({ summary: 'Xodimga rol biriktirish' })
  assignRole(@Body() dto: CreateEmployeeRoleDto) {
    return this.employeeRoleService.assignRole(dto);
  }

  @Delete()
  @Roles('superadmin')
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
