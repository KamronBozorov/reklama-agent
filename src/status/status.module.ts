import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from './models/status.model';
import { StatusResolver } from './status.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService, StatusResolver],
  exports: [StatusService],
})
export class StatusModule {}
