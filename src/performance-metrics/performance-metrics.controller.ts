import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PerformanceMetric } from './models/performance-metric.model';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Performance Metrics')
@ApiBearerAuth('accessToken')
@Controller('performance-metrics')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class PerformanceMetricsController {
  constructor(private readonly service: PerformanceMetricsService) {}

  @Post()
  @Roles('superadmin', 'analyst')
  @ApiOperation({ summary: 'Yangi metrik yaratish' })
  @ApiBody({ type: CreatePerformanceMetricDto })
  @ApiResponse({ status: 201, type: PerformanceMetric })
  create(@Body() dto: CreatePerformanceMetricDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('superadmin', 'analyst', 'manager')
  @ApiOperation({ summary: 'Barcha metriklar' })
  @ApiResponse({ status: 200, type: [PerformanceMetric] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'analyst', 'manager')
  @ApiOperation({ summary: 'ID orqali metrik olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: PerformanceMetric })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin', 'analyst')
  @ApiOperation({ summary: 'Metrikni yangilash' })
  @ApiBody({ type: UpdatePerformanceMetricDto })
  update(@Param('id') id: string, @Body() dto: UpdatePerformanceMetricDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('superadmin', 'analyst')
  @ApiOperation({ summary: "Metrikni o'chirish" })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
