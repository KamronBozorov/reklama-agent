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
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Advertisement } from './models/advertisement.model';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Reklamalar')
@ApiBearerAuth('accessToken')
@Controller('advertisements')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class AdvertisementsController {
  constructor(private readonly service: AdvertisementsService) {}

  @Post()
  @Roles('superadmin', 'manager', 'media_buyer')
  @ApiOperation({ summary: 'Yangi reklama yaratish' })
  @ApiResponse({ status: 201, type: Advertisement })
  create(@Body() dto: CreateAdvertisementDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('superadmin', 'manager', 'media_buyer', 'analyst')
  @ApiOperation({ summary: 'Barcha reklamalarni olish' })
  @ApiResponse({ status: 200, type: [Advertisement] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'manager', 'media_buyer', 'analyst')
  @ApiOperation({ summary: 'ID orqali reklamani olish' })
  @ApiResponse({ status: 200, type: Advertisement })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin', 'manager', 'media_buyer')
  @ApiOperation({ summary: 'Reklamani yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdateAdvertisementDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: "Reklamani o'chirish" })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
