import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './models/status.model';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CampaignsService } from 'src/campaigns/campaigns.service';
import { AdvertisementsService } from 'src/advertisements/advertisements.service';
import { PlacementsService } from 'src/placements/placements.service';

@Injectable()
export class StatusService {
  constructor(@InjectModel(Status) private statusModel: typeof Status) {}

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    return await this.statusModel.create(createStatusDto);
  }

  async findAll(): Promise<Status[]> {
    return await this.statusModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Status> {
    const status = await this.statusModel.findByPk(id, {
      include: { all: true },
    });
    if (!status) {
      throw new NotFoundException(`Status with id ${id} not found`);
    }
    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.findOne(id);
    return await status.update(updateStatusDto);
  }

  async remove(id: number): Promise<void> {
    const status = await this.findOne(id);
    await status.destroy();
  }
}
