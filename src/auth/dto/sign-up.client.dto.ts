import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, Matches } from 'class-validator';

export class SignUpClientDto {
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

  @ApiProperty({ example: 'StrongPass123', description: 'Parol tasdiqlanishi' })
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: 'IT',
    description: 'Ishlab chiqarish sohasi yoki soha nomi',
  })
  @IsString()
  industry: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'Bog‘lanish maʼlumoti (telefon raqami yoki email)',
  })
  @IsString()
  contact_info: string;
}
