import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  department_id?: number;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  hire_date: Date;

  @ApiProperty({ example: '3 yil IT sohasida ishlagan' })
  @IsString()
  experience: string;
}
