// create-advertisement.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateAdvertisementDto {
  @ApiProperty()
  @IsInt()
  campaign_id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  media_type: string;

  @ApiProperty()
  @IsString()
  target_audience: string;

  @ApiProperty()
  @IsInt()
  status_id: number;
}
