import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Campaign } from './models/campaign.model';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Kampaniyalar')
@ApiBearerAuth('accessToken')
@Controller('campaigns')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly service: CampaignsService) {}

  @Post()
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: 'Yangi kampaniya yaratish' })
  @ApiResponse({ status: 201, type: Campaign })
  create(@Body() dto: CreateCampaignDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('superadmin', 'manager', 'client', 'analyst')
  @ApiOperation({ summary: 'Barcha kampaniyalarni olish' })
  @ApiResponse({ status: 200, type: [Campaign] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'manager', 'client', 'analyst')
  @ApiOperation({ summary: 'ID orqali kampaniya olish' })
  @ApiResponse({ status: 200, type: Campaign })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post('high-ctr')
  @ApiOperation({ summary: 'Eng samarali reklama kampaniyalarini topish' })
  highCtr() {
    return this.service.highCtr();
  }

  @Patch(':id')
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: 'Kampaniyani yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdateCampaignDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: "Kampaniyani o'chirish" })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
