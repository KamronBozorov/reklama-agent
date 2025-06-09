import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './models/user.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SelfGuard } from '../common/guards/self.guard';
import { Use } from 'nestjs-telegraf';
import { OverdueDto } from './dto/overdue.dto';

@ApiTags('Users')
@ApiBearerAuth('accessToken')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('superadmin')
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' })
  @ApiResponse({ status: 201, type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles('superadmin', 'manager')
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(SelfGuard)
  @ApiOperation({ summary: "ID bo'yicha foydalanuvchini olish" })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post('getTotalCost')
  @ApiOperation({ summary: 'Har bir mijoz uchun to‘langan umumiy summa' })
  getTotalCost() {
    return this.usersService.getTotal();
  }

  @Post('overdueInvoices')
  @ApiOperation({ summary: 'Har bir mijoz uchun to‘langan umumiy summa' })
  overdueInvoices(@Body() dto: OverdueDto) {
    return this.usersService.overdueInvoices(dto);
  }

  @Post('employeeRoles')
  @ApiOperation({
    summary:
      'Har bir xodimga biriktirilgan rollar ro‘yxati (pivot table bilan)',
  })
  employeeRoles() {
    return this.usersService.employeeRoles();
  }

  @Patch(':id')
  @UseGuards(SelfGuard)
  @ApiOperation({ summary: "ID bo'yicha foydalanuvchini yangilash" })
  @ApiResponse({ status: 200, type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(SelfGuard)
  @ApiOperation({ summary: "ID bo'yicha foydalanuvchini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli o'chirildi",
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
