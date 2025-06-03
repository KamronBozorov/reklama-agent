import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './models/employee.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeesResolver } from './employees.resolver';
import { DeparmentModule } from 'src/deparment/deparment.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Employee]),
    DeparmentModule,
    UsersModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesResolver],
  exports: [EmployeesService],
})
export class EmployeesModule {}
