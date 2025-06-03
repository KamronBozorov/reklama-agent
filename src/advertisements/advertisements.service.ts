import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Advertisement } from './models/advertisement.model';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { StatusService } from 'src/status/status.service';
import { CampaignsService } from 'src/campaigns/campaigns.service';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectModel(Advertisement) private model: typeof Advertisement,
    private readonly statusService: StatusService,
    private readonly campaignService: CampaignsService,
  ) {}

  async create(dto: CreateAdvertisementDto): Promise<Advertisement> {
    const { status_id, campaign_id } = dto;

    await this.statusService.findOne(status_id);
    await this.campaignService.findOne(campaign_id);
    return this.model.create(dto);
  }

  async findAll(): Promise<Advertisement[]> {
    return this.model.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Advertisement> {
    const adv = await this.model.findByPk(id, { include: { all: true } });
    if (!adv) throw new NotFoundException('Reklama topilmadi');
    return adv;
  }

  async update(
    id: number,
    dto: UpdateAdvertisementDto,
  ): Promise<Advertisement> {
    const adv = await this.findOne(id);
    return adv.update(dto);
  }

  async remove(id: number): Promise<void> {
    const adv = await this.findOne(id);
    await adv.destroy();
  }
}
