import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpClientDto } from './dto/sign-up.client.dto';
import { SignInClientDto } from './dto/sign-in.client.dto';
import { Request, Response } from 'express';
import { SignUpEmployeeDto } from './dto/sign-up.employee.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { AdminGuards } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Auth - Ro‘yxatdan o‘tish va Kirish')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('client/sign-up')
  @ApiOperation({ summary: 'Mijoz ro‘yxatdan o‘tishi' })
  @ApiBody({ type: SignUpClientDto })
  @ApiResponse({ status: 201, description: 'Muvaffaqiyatli ro‘yxatdan o‘tdi' })
  async clientSignUp(@Body() dto: SignUpClientDto) {
    return await this.authService.signUpClient(dto);
  }

  @Post('employee/sign-up')
  @ApiOperation({ summary: 'Xodim ro‘yxatdan o‘tishi' })
  @ApiBody({ type: SignUpEmployeeDto })
  @ApiResponse({ status: 201, description: 'Xodim ro‘yxatdan o‘tdi' })
  async employeeSignUp(@Body() dto: SignUpEmployeeDto) {
    return await this.authService.signUpEmployee(dto);
  }

  @Roles('admin', 'hello')
  @UseGuards(AdminGuards)
  @Post('client/sign-in')
  @ApiOperation({ summary: 'Mijoz tizimga kirishi' })
  @ApiBody({ type: SignInClientDto })
  @ApiResponse({ status: 200, description: 'Token qaytariladi' })
  async clientSignIn(
    @Body() dto: SignInClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.clientSignIn(dto, res);
  }

  @Post('employee/sign-in')
  @ApiOperation({ summary: 'Xodim tizimga kirishi' })
  @ApiBody({ type: SignInClientDto })
  @ApiResponse({ status: 200, description: 'Token qaytariladi' })
  async employeeSignIn(
    @Body() dto: SignInClientDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.singInEmployee(dto, res);
  }

  @Get('client/activate/:link')
  @ApiOperation({ summary: 'Email orqali faollashtirish' })
  @ApiParam({ name: 'link', description: 'Aktivatsiya linki' })
  @ApiResponse({ status: 200, description: 'Email faollashtirildi' })
  async activate(@Param('link') link: string) {
    return await this.authService.activate(link);
  }

  @Post('log-out')
  @ApiOperation({ summary: 'Tizimdan chiqish' })
  @ApiResponse({ status: 200, description: 'Refresh token o‘chirildi' })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(req, res);
  }
}
