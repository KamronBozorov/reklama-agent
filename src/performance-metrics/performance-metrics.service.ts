import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PerformanceMetric } from './models/performance-metric.model';
import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto';
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto';

@Injectable()
export class PerformanceMetricsService {
  constructor(
    @InjectModel(PerformanceMetric) private model: typeof PerformanceMetric,
  ) {}

  create(dto: CreatePerformanceMetricDto) {
    return this.model.create(dto);
  }

  findAll() {
    return this.model.findAll();
  }

  async findOne(id: number) {
    const metric = await this.model.findByPk(id);
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
