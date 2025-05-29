import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Campaign } from './models/campaign.model';

@ApiTags('Kampaniyalar')
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly service: CampaignsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi kampaniya yaratish' })
  @ApiResponse({ status: 201, type: Campaign })
  create(@Body() dto: CreateCampaignDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kampaniyalarni olish' })
  @ApiResponse({ status: 200, type: [Campaign] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali kampaniya olish' })
  @ApiResponse({ status: 200, type: Campaign })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Kampaniyani yangilash' })
  update(@Param('id') id: string, @Body() dto: UpdateCampaignDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kampaniyani o‘chirish' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
