import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Marketing', description: 'Bo‘lim nomi' })
  @IsString()
  name: string;
}
