import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeRole } from './models/employee-role.model';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';
import { EmployeesService } from 'src/employees/employees.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class EmployeeRoleService {
  constructor(
    @InjectModel(EmployeeRole)
    private employeeRoleModel: typeof EmployeeRole,
    private readonly employeeService: EmployeesService,
    private readonly roleService: RolesService,
  ) {}

  async assignRole(dto: CreateEmployeeRoleDto): Promise<EmployeeRole> {
    const { role_id, employee_id } = dto;

    await this.roleService.findOne(role_id);
    await this.employeeService.findOne(employee_id);

    return this.employeeRoleModel.create(dto);
  }

  async removeRole(employee_id: number, role_id: number): Promise<void> {
    await this.employeeRoleModel.destroy({
      where: { employee_id, role_id },
    });
  }
}
