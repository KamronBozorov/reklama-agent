import { Field, Int } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateDepartmentInput } from 'src/deparment/dto/create-deparment.input';

export class UpdatePaymentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => Int, { description: "To'lov ID si" })
  @IsNumber()
  id: number;
}
