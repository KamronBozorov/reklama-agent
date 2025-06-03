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
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaymentMethod } from './models/payment_method.model';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags("To'lov usullari")
@ApiBearerAuth('accessToken')
@Controller('payment-method')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class PaymentMethodController {
  constructor(private readonly service: PaymentMethodService) {}

  @Post()
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "Yangi to'lov usuli yaratish" })
  @ApiResponse({ status: 201, type: PaymentMethod })
  create(@Body() dto: CreatePaymentMethodDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "Barcha to'lov usullarini olish" })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "ID orqali to'lov usulini olish" })
  @ApiResponse({ status: 200, type: PaymentMethod })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "To'lov usulini yangilash" })
  update(@Param('id') id: string, @Body() dto: UpdatePaymentMethodDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "To'lov usulini o'chirish" })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
