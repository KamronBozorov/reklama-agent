import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsDateString,
  IsInt,
} from 'class-validator';

export class ResetPasswordEmployeeDto {
  @ApiProperty({
    example: 'ali@example.com',
    description: 'Foydalanuvchining email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPass123',
    description: 'Eski parolni kiriting',
  })
  @IsString()
  @MinLength(6)
  old_password: string;

  @ApiProperty({
    example: 'StrongPass123',
    description: 'Yangi parolni kiriting',
  })
  @IsString()
  @MinLength(6)
  new_password: string;

  @ApiProperty({
    example: 'StrongPass123',
    description: 'Yangi parolni tasdiqlang',
  })
  @IsString()
  @MinLength(6)
  confirm_password: string;
}
