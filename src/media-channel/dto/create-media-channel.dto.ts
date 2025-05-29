import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMediaChannelDto {
  @ApiProperty({ example: 'YouTube', description: 'Media kanal nomi' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Video',
    description: 'Kanal turi (masalan, video, banner, blog)',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: 'youtube@example.com',
    description: 'Aloqa uchun ma’lumot',
  })
  @IsString()
  contact_info: string;
}
