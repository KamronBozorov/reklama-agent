import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePaymentMethodInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;
}
