import { Module } from '@nestjs/common';
import { PerformanceMetricsService } from './performance-metrics.service';
import { PerformanceMetricsController } from './performance-metrics.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PerformanceMetric } from './models/performance-metric.model';
import { AdvertisementsModule } from 'src/advertisements/advertisements.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PerformanceMetric]),
    AdvertisementsModule,
  ],

  controllers: [PerformanceMetricsController],
  providers: [PerformanceMetricsService],
  exports: [PerformanceMetricsService],
})
export class PerformanceMetricsModule {}
