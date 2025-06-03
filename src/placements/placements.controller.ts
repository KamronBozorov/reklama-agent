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
import { PlacementsService } from './placements.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { UpdatePlacementDto } from './dto/update-placement.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Placement } from './models/placement.model';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Joylashtirishlar (Placements)')
@ApiBearerAuth('accessToken')
@Controller('placements')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class PlacementsController {
  constructor(private readonly service: PlacementsService) {}

  @Post()
  @Roles('superadmin', 'manager', 'media_buyer')
  @ApiOperation({ summary: 'Yangi joylashtirish yaratish' })
  @ApiResponse({ status: 201, type: Placement })
  create(@Body() dto: CreatePlacementDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('superadmin', 'manager', 'media_buyer', 'analyst')
  @ApiOperation({ summary: 'Barcha joylashtirishlarni olish' })
  @ApiResponse({ status: 200, type: [Placement] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'manager', 'media_buyer', 'analyst')
  @ApiOperation({ summary: 'ID orqali joylashtirishni olish' })
  @ApiResponse({ status: 200, type: Placement })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin', 'manager', 'media_buyer')
  @ApiOperation({ summary: 'Joylashtirishni yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdatePlacementDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: "Joylashtirishni o'chirish" })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
