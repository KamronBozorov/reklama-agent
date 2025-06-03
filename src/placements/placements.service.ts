import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Placement } from './models/placement.model';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
import { AdvertisementsService } from 'src/advertisements/advertisements.service';
import { MediaChannelsService } from 'src/media-channel/media-channel.service';
import { StatusService } from 'src/status/status.service';

@Injectable()
export class PlacementsService {
  constructor(
    @InjectModel(Placement) private placementModel: typeof Placement,
    private readonly addService: AdvertisementsService,
    private readonly statusService: StatusService,
    private readonly channelService: MediaChannelsService,
  ) {}

  async create(dto: CreatePlacementDto): Promise<Placement> {
    const { ad_id, status_id, channel_id } = dto;

    await this.addService.findOne(ad_id);
    await this.statusService.findOne(status_id);
    await this.channelService.findOne(channel_id);

    return this.placementModel.create(dto);
  }

  async findAll(): Promise<Placement[]> {
    return this.placementModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Placement> {
    const placement = await this.placementModel.findByPk(id, {
      include: { all: true },
    });
    if (!placement) throw new NotFoundException('Placement topilmadi');
    return placement;
  }

  async update(id: number, dto: UpdatePlacementDto): Promise<Placement> {
    const placement = await this.findOne(id);
    return placement.update(dto);
  }

  async remove(id: number): Promise<void> {
    const placement = await this.findOne(id);
    await placement.destroy();
  }
}
