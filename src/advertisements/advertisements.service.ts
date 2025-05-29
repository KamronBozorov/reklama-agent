import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Advertisement } from './models/advertisement.model';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectModel(Advertisement) private model: typeof Advertisement,
  ) {}

  async create(dto: CreateAdvertisementDto): Promise<Advertisement> {
    return this.model.create(dto);
  }

  async findAll(): Promise<Advertisement[]> {
    return this.model.findAll();
  }

  async findOne(id: number): Promise<Advertisement> {
    const adv = await this.model.findByPk(id);
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
