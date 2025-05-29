import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, IsNumber } from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  client_id: number;

  @ApiProperty({ example: 'Yozgi Aksiya' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-06-01' })
  @IsDateString()
  start_date: Date;

  @ApiProperty({ example: '2024-06-30' })
  @IsDateString()
  end_date: Date;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  budget: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  status_id: number;
}
