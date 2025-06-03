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
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Status } from './models/status.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Status')
@ApiBearerAuth('accessToken')
@Controller('status')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: 'Yangi status yaratish' })
  @ApiResponse({ status: 201, type: Status })
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  @Roles('superadmin', 'manager', 'analyst')
  @ApiOperation({ summary: 'Barcha statuslarni olish' })
  @ApiResponse({ status: 200, type: [Status] })
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'manager', 'analyst')
  @ApiOperation({ summary: "ID bo'yicha statusni olish" })
  @ApiResponse({ status: 200, type: Status })
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: "ID bo'yicha statusni yangilash" })
  @ApiResponse({ status: 200, type: Status })
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @Delete(':id')
  @Roles('superadmin')
  @ApiOperation({ summary: "ID bo'yicha statusni o'chirish" })
  @ApiResponse({ status: 200, description: "Status muvaffaqiyatli o'chirildi" })
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
