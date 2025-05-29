import { Module } from '@nestjs/common';
import { PlacementsService } from './placements.service';
import { PlacementsController } from './placements.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Placement } from './models/placement.model';
import { PlacementsResolver } from './placements.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Placement])],
  controllers: [PlacementsController],
  providers: [PlacementsService, PlacementsResolver],
  exports: [PlacementsService],
})
export class PlacementsModule {}
