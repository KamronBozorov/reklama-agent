import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { SequenceError } from 'rxjs';
import { SequelizeModule } from '@nestjs/sequelize';
import { Campaign } from './models/campaign.model';
import { CampaignsResolver } from './campaigns.resolver';
import { StatusModule } from 'src/status/status.module';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Campaign]),
    StatusModule,
    ClientsModule,
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsResolver],
  exports: [CampaignsService],
})
export class CampaignsModule {}
