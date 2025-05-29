import { Module } from '@nestjs/common';
import { MediaChannelsController } from './media-channel.controller';
import { MediaChannelsService } from './media-channel.service';
import { MediaChannelsResolver } from './media-channel.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { MediaChannel } from './models/media-channel.model';

@Module({
  imports: [SequelizeModule.forFeature([MediaChannel])],
  controllers: [MediaChannelsController],
  providers: [MediaChannelsService, MediaChannelsResolver],
  exports: [MediaChannelsService],
})
export class MediaChannelModule {}
