import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsDateString,
  IsInt,
} from 'class-validator';

export class SignUpEmployeeDto {
  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'Foydalanuvchining toʻliq ismi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'ali@example.com',
    description: 'Foydalanuvchining email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPass123',
    description: 'Parol (kamida 6 ta belgidan iborat)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'StrongPass123',
    description: 'Parol tasdiqlanishi',
  })
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: 2,
    description: 'Bo‘lim (department) ID raqami',
  })
  @IsInt()
  department_id: number;

  @ApiProperty({
    example: '2024-01-15',
    description: 'Ishga olingan sana (ISO formatda)',
  })
  @IsDateString()
  hire_date: Date;

  @ApiProperty({
    example: '3 yil tajriba IT sohasida',
    description: 'Xodimning umumiy tajribasi',
  })
  @IsString()
  experience: string;
}
