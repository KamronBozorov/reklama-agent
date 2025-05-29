import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeRole } from './models/employee-role.model';
import { CreateEmployeeRoleDto } from './dto/create-employee-role.dto';

@Injectable()
export class EmployeeRoleService {
  constructor(
    @InjectModel(EmployeeRole)
    private employeeRoleModel: typeof EmployeeRole,
  ) {}

  async assignRole(dto: CreateEmployeeRoleDto): Promise<EmployeeRole> {
    return this.employeeRoleModel.create(dto);
  }

  async removeRole(employee_id: number, role_id: number): Promise<void> {
    await this.employeeRoleModel.destroy({
      where: { employee_id, role_id },
    });
  }
}
