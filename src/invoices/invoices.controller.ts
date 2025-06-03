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
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Hisob-fakturalar')
@ApiBearerAuth('accessToken')
@Controller('invoices')
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: 'Yangi hisob-faktura yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Hisob-faktura muvaffaqiyatli yaratildi',
  })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: 'Barcha hisob-fakturalarni olish' })
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "ID bo'yicha hisob-fakturani olish" })
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: 'Hisob-fakturani yangilash' })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  @Roles('superadmin', 'accountant')
  @ApiOperation({ summary: "Hisob-fakturani o'chirish" })
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }
}
