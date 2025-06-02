import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentMethodDto {
  @ApiProperty({ example: 'Payme', description: 'To‘lov usuli nomi' })
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;
}
