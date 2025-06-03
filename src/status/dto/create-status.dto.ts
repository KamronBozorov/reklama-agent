import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'Active', description: 'Status name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Status is active',
    description: 'Status description',
  })
  @IsString()
  @IsNotEmpty()
  table_name: string;
}
