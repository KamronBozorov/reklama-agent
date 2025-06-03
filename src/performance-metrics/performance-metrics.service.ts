import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PerformanceMetric } from './models/performance-metric.model';
import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto';
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto';
import { AdvertisementsService } from 'src/advertisements/advertisements.service';

@Injectable()
export class PerformanceMetricsService {
  constructor(
    @InjectModel(PerformanceMetric) private model: typeof PerformanceMetric,
    private readonly addService: AdvertisementsService,
  ) {}

  async create(dto: CreatePerformanceMetricDto) {
    const { ad_id } = dto;

    await this.addService.findOne(ad_id);
    return this.model.create(dto);
  }

  findAll() {
    return this.model.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const metric = await this.model.findByPk(id, { include: { all: true } });
    if (!metric) throw new NotFoundException('Metric topilmadi');
    return metric;
  }

  async update(id: number, dto: UpdatePerformanceMetricDto) {
    const metric = await this.findOne(id);
    return metric.update(dto);
  }

  async remove(id: number) {
    const metric = await this.findOne(id);
    await metric.destroy();
  }
}
