import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    example: 1,
    description: 'User ID (foydalanuvchining ID raqami)',
  })
  user_id: number;

  @ApiProperty({ example: 'Marketing', description: 'Soha turi' })
  industry: string;

  @ApiProperty({
    example: '+998991112233',
    description: 'Bogʻlanish maʼlumotlari',
  })
  contact_info: string;
}
