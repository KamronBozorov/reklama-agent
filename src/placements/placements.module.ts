import { Module } from '@nestjs/common';
import { PlacementsService } from './placements.service';
import { PlacementsController } from './placements.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Placement } from './models/placement.model';
import { PlacementsResolver } from './placements.resolver';
import { MediaChannelModule } from 'src/media-channel/media-channel.module';
import { AdvertisementsModule } from 'src/advertisements/advertisements.module';
import { StatusModule } from 'src/status/status.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Placement]),
    MediaChannelModule,
    AdvertisementsModule,
    StatusModule,
  ],
  controllers: [PlacementsController],
  providers: [PlacementsService, PlacementsResolver],
  exports: [PlacementsService],
})
export class PlacementsModule {}
