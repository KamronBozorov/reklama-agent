import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsNumber } from 'class-validator';

export class CreatePlacementDto {
  @ApiProperty({
    example: 1,
    description: 'Reklama (advertisement) ID raqami',
  })
  @IsInt()
  ad_id: number;

  @ApiProperty({
    example: 3,
    description: 'Media kanal (channel) ID raqami',
  })
  @IsInt()
  channel_id: number;

  @ApiProperty({
    example: '2024-07-01',
    description: 'Reklama joylashtirilgan sana (YYYY-MM-DD)',
  })
  @IsDateString()
  placement_date: Date;

  @ApiProperty({
    example: 500000.5,
    description: 'Joylashtirish narxi (cost)',
  })
  @IsNumber()
  cost: number;

  @ApiProperty({
    example: 1,
    description: 'Status ID',
  })
  @IsInt()
  status_id: number;
}
