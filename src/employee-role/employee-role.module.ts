import { Module } from '@nestjs/common';
import { EmployeeRoleService } from './employee-role.service';
import { EmployeeRoleController } from './employee-role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeRoleResolver } from './employee-role.resolver';
import { EmployeeRole } from './models/employee-role.model';

@Module({
  imports: [SequelizeModule.forFeature([EmployeeRole])],
  controllers: [EmployeeRoleController],
  providers: [EmployeeRoleService, EmployeeRoleResolver],
  exports: [EmployeeRoleService],
})
export class EmployeeRoleModule {}
