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
import { DepartmentsService } from './deparment.service';
import { CreateDepartmentDto } from './dto/create-deparment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Department } from './models/deparment.model';
import { UpdateDeparmentDto } from './dto/update-deparment.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags("Bo'limlar")
@ApiBearerAuth('accessToken')
@Controller('department')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Post()
  @Roles('superadmin')
  @ApiOperation({ summary: "Yangi bo'lim yaratish" })
  @ApiResponse({ status: 201, type: Department })
  create(@Body() dto: CreateDepartmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: "Barcha bo'limlarni olish" })
  @ApiResponse({ status: 200, type: [Department] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'manager')
  @ApiOperation({ summary: "ID orqali bo'limni olish" })
  @ApiResponse({ status: 200, type: Department })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin')
  @ApiOperation({ summary: "Bo'limni yangilash" })
  update(@Param('id') id: string, @Body() dto: UpdateDeparmentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('superadmin')
  @ApiOperation({ summary: "Bo'limni o'chirish" })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
