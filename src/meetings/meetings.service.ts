import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meeting } from './models/meeting.model';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { CampaignsService } from 'src/campaigns/campaigns.service';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectModel(Meeting) private model: typeof Meeting,
    private readonly campaignService: CampaignsService,
  ) {}

  async create(dto: CreateMeetingDto) {
    const { campaign_id } = dto;

    await this.campaignService.findOne(campaign_id);

    return this.model.create(dto);
  }

  findAll() {
    return this.model.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const meeting = await this.model.findByPk(id, { include: { all: true } });
    if (!meeting) throw new NotFoundException('Meeting topilmadi');
    return meeting;
  }

  async update(id: number, dto: UpdateMeetingDto) {
    const meeting = await this.findOne(id);
    return meeting.update(dto);
  }

  async remove(id: number) {
    const meeting = await this.findOne(id);
    await meeting.destroy();
  }
}
