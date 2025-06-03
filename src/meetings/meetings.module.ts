import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meeting } from './models/meeting.model';
import { MeetingsResolver } from './meetings.resolver';
import { CampaignsModule } from 'src/campaigns/campaigns.module';

@Module({
  imports: [SequelizeModule.forFeature([Meeting]), CampaignsModule],
  controllers: [MeetingsController],
  providers: [MeetingsService, MeetingsResolver],
  exports: [MeetingsService],
})
export class MeetingsModule {}
