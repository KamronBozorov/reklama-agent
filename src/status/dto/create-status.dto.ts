import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @ApiProperty({ example: 'active', description: 'Status nomi' })
  name: string;

  @ApiProperty({
    example: 'clients',
    description: 'Status bog‘liq jadval nomi',
  })
  table_name: string;
}
