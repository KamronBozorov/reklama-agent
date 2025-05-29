import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString } from 'class-validator';

export class CreatePerformanceMetricDto {
  @ApiProperty({ example: 5, description: 'Reklama ID raqami' })
  @IsInt()
  ad_id: number;

  @ApiProperty({ example: 12000, description: 'Ko‘rishlar soni' })
  @IsInt()
  impressions: number;

  @ApiProperty({ example: 350, description: 'Kliklar soni' })
  @IsInt()
  clicks: number;

  @ApiProperty({ example: 42, description: 'Konversiyalar soni' })
  @IsInt()
  conversions: number;

  @ApiProperty({ example: '2024-06-10', description: 'Statistikaga oid sana' })
  @IsDateString()
  date: Date;
}
