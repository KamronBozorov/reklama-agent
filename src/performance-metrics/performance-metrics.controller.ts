import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PerformanceMetricsService } from './performance-metrics.service';
import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto';
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PerformanceMetric } from './models/performance-metric.model';

@ApiTags('Performance Metrics')
@Controller('performance-metrics')
export class PerformanceMetricsController {
  constructor(private readonly service: PerformanceMetricsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi metrik yaratish' })
  @ApiBody({ type: CreatePerformanceMetricDto })
  @ApiResponse({ status: 201, type: PerformanceMetric })
  create(@Body() dto: CreatePerformanceMetricDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha metriklar' })
  @ApiResponse({ status: 200, type: [PerformanceMetric] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali metrik olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: PerformanceMetric })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Metrikni yangilash' })
  @ApiBody({ type: UpdatePerformanceMetricDto })
  update(@Param('id') id: string, @Body() dto: UpdatePerformanceMetricDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Metrikni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
