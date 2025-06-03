import { Module } from '@nestjs/common';
import { EmployeeRoleService } from './employee-role.service';
import { EmployeeRoleController } from './employee-role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeRoleResolver } from './employee-role.resolver';
import { EmployeeRole } from './models/employee-role.model';
import { RolesModule } from 'src/roles/roles.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    SequelizeModule.forFeature([EmployeeRole]),
    RolesModule,
    EmployeesModule,
  ],
  controllers: [EmployeeRoleController],
  providers: [EmployeeRoleService, EmployeeRoleResolver],
  exports: [EmployeeRoleService],
})
export class EmployeeRoleModule {}
