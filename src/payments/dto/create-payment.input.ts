import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreatePaymentInput {
  @Field(() => Int, {
    description: 'Tegishli invoice (hisob-faktura) ID raqami',
  })
  @IsNumber()
  @IsNotEmpty()
  invoice_id: number;

  @Field(() => String, {
    description: 'To‘lov amalga oshirilgan sana (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsNotEmpty()
  payment_date: Date;

  @Field(() => Float, { description: 'To‘lov summasi (so‘mda)' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @Field(() => Int, {
    description: 'To‘lov usuli ID (masalan: 1 - naqd, 2 - karta)',
  })
  @IsNumber()
  @IsNotEmpty()
  method_id: number;

  @Field(() => Int, {
    description:
      'To‘lov holati ID (masalan: 1 - tasdiqlangan, 2 - bekor qilingan)',
  })
  @IsNumber()
  @IsNotEmpty()
  status_id: number;
}
