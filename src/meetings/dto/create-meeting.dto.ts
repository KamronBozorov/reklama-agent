import { IsNotEmpty, IsNumber, IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMeetingDto {
  @ApiProperty({ example: 1, description: 'Bog‘liq kampaniya ID raqami' })
  @IsNumber()
  @IsNotEmpty()
  campaign_id: number;

  @ApiProperty({
    example: '2024-06-05',
    description: 'Uchrashuv sanasi (YYYY-MM-DD)',
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    example: 'Kampaniya bosqichlari muhokamasi',
    description: 'Uchrashuv kun tartibi',
  })
  @IsString()
  @IsNotEmpty()
  agenda: string;

  @ApiProperty({
    example: 'Barcha masalalar kelishildi',
    description: 'Uchrashuv bayonnomasi',
  })
  @IsString()
  minutes: string;
}
