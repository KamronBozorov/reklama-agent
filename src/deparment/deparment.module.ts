import { Module } from '@nestjs/common';
import { DepartmentsController } from './deparment.controller';
import { DepartmentsService } from './deparment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Department } from './models/deparment.model';
import { DepartmentsResolver } from './deparment.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Department])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, DepartmentsResolver],
  exports: [DepartmentsService],
})
export class DeparmentModule {}
