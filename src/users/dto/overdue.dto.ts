import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class OverdueDto {
  @ApiProperty({ example: '2025-08-08' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  date: string;
}
