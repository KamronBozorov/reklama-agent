import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { SequenceError } from 'rxjs';
import { SequelizeModule } from '@nestjs/sequelize';
import { Campaign } from './models/campaign.model';
import { CampaignsResolver } from './campaigns.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Campaign])],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsResolver],
  exports: [CampaignsService],
})
export class CampaignsModule {}
