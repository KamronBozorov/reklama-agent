import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Campaign } from './models/campaign.model';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(@InjectModel(Campaign) private model: typeof Campaign) {}

  async create(dto: CreateCampaignDto): Promise<Campaign> {
    return this.model.create(dto);
  }

  async findAll(): Promise<Campaign[]> {
    return this.model.findAll();
  }

  async findOne(id: number): Promise<Campaign> {
    const item = await this.model.findByPk(id);
    if (!item) throw new NotFoundException('Kampaniya topilmadi');
    return item;
  }

  async update(id: number, dto: UpdateCampaignDto): Promise<Campaign> {
    const item = await this.findOne(id);
    return item.update(dto);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await item.destroy();
  }
}
