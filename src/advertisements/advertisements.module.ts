import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Advertisement } from './models/advertisement.model';
import { AdvertisementsResolver } from './advertisements.resolver';
import { CampaignsModule } from 'src/campaigns/campaigns.module';
import { StatusModule } from 'src/status/status.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Advertisement]),
    CampaignsModule,
    StatusModule,
  ],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService, AdvertisementsResolver],
  exports: [AdvertisementsService],
})
export class AdvertisementsModule {}
