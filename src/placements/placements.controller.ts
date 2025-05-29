import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PlacementsService } from './placements.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Placement } from './models/placement.model';

@ApiTags('Joylashtirishlar (Placements)')
@Controller('placements')
export class PlacementsController {
  constructor(private readonly service: PlacementsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi joylashtirish yaratish' })
  @ApiResponse({ status: 201, type: Placement })
  create(@Body() dto: CreatePlacementDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha joylashtirishlarni olish' })
  @ApiResponse({ status: 200, type: [Placement] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali joylashtirishni olish' })
  @ApiResponse({ status: 200, type: Placement })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Joylashtirishni yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdatePlacementDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Joylashtirishni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
