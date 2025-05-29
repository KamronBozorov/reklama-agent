import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Placement } from './models/placement.model';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';

@Injectable()
export class PlacementsService {
  constructor(
    @InjectModel(Placement) private placementModel: typeof Placement,
  ) {}

  async create(dto: CreatePlacementDto): Promise<Placement> {
    return this.placementModel.create(dto);
  }

  async findAll(): Promise<Placement[]> {
    return this.placementModel.findAll();
  }

  async findOne(id: number): Promise<Placement> {
    const placement = await this.placementModel.findByPk(id);
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
