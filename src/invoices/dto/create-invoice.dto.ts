import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsDecimal } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty({ example: 1, description: 'Client ID raqami' })
  @IsNumber()
  @IsNotEmpty()
  client_id: number;

  @ApiProperty({ example: '2025-06-01', description: 'Hisob-faktura sanasi' })
  @IsDateString()
  @IsNotEmpty()
  invoice_date: Date;

  @ApiProperty({ example: 150000.5, description: 'Jami miqdor' })
  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @ApiProperty({ example: '2025-06-10', description: 'To‘lov muddati' })
  @IsDateString()
  @IsNotEmpty()
  due_date: Date;

  @ApiProperty({ example: 1, description: 'Campaign ID raqami' })
  @IsNumber()
  @IsNotEmpty()
  campaign_id: number;

  @ApiProperty({ example: 100000, description: 'Invoice summasi (so‘mda)' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: '2025-06-05',
    description: 'Invoice berilgan sanasi',
  })
  @IsDateString()
  @IsNotEmpty()
  issue_date: Date;

  @ApiProperty({ example: 1, description: 'Status ID raqami' })
  @IsNumber()
  @IsNotEmpty()
  status_id: number;
}
