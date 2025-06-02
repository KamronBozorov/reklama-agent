import { Module } from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Meeting } from './models/meeting.model';
import { MeetingsResolver } from './meetings.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Meeting])],
  controllers: [MeetingsController],
  providers: [MeetingsService, MeetingsResolver],
  exports: [MeetingsService],
})
export class MeetingsModule {}
