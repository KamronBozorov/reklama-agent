import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MediaChannel } from './models/media-channel.model';
import { CreateMediaChannelDto } from './dto/create-media-channel.dto';
import { UpdateMediaChannelDto } from './dto/update-media-channel.dto';

@Injectable()
export class MediaChannelsService {
  constructor(@InjectModel(MediaChannel) private model: typeof MediaChannel) {}

  create(dto: CreateMediaChannelDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.findAll();
  }

  async findOne(id: number) {
    const channel = await this.model.findByPk(id);
    if (!channel) throw new NotFoundException('Channel topilmadi');
    return channel;
  }

  async update(id: number, dto: UpdateMediaChannelDto) {
    const channel = await this.findOne(id);
    return channel.update(dto);
  }

  async remove(id: number) {
    const channel = await this.findOne(id);
    await channel.destroy();
  }
}
