import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: 'Tegishli invoice (hisob-faktura) ID raqami',
  })
  @IsNumber()
  @IsNotEmpty()
  invoice_id: number;

  @ApiProperty({
    example: '2025-06-01',
    description: 'To‘lov amalga oshirilgan sana (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsNotEmpty()
  payment_date: Date;

  @ApiProperty({ example: 500000, description: 'To‘lov summasi (so‘mda)' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 2,
    description: 'To‘lov usuli ID (masalan: 1 - naqd, 2 - karta)',
  })
  @IsNumber()
  @IsNotEmpty()
  method_id: number;

  @ApiProperty({
    example: 1,
    description:
      'To‘lov holati ID (masalan: 1 - tasdiqlangan, 2 - bekor qilingan)',
  })
  @IsNumber()
  @IsNotEmpty()
  status_id: number;
}
