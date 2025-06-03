import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Campaign } from './models/campaign.model';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ClientsService } from 'src/clients/clients.service';
import { StatusService } from 'src/status/status.service';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign) private model: typeof Campaign,
    private readonly statusService: StatusService,
    private readonly clientService: ClientsService,
  ) {}

  async create(dto: CreateCampaignDto): Promise<Campaign> {
    const { status_id, client_id } = dto;

    await this.statusService.findOne(status_id);
    await this.clientService.findOne(client_id);
    return this.model.create(dto);
  }

  async findAll(): Promise<Campaign[]> {
    return this.model.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Campaign> {
    const item = await this.model.findByPk(id, { include: { all: true } });
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
