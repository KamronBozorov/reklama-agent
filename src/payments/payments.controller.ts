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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags("To'lovlar")
@ApiBearerAuth('accessToken')
@Controller('payments')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "Yangi to'lov yaratish" })
  @ApiResponse({ status: 201, description: "To'lov muvaffaqiyatli yaratildi" })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "Barcha to'lovlarni olish" })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "ID bo'yicha to'lovni olish" })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "To'lovni yangilash" })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "To'lovni o'chirish" })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
