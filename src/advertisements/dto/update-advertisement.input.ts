import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { CreateAdvertisementInput } from './create-advertisement.input';

@InputType()
export class UpdateAdvertisementInput extends PartialType(
  CreateAdvertisementInput,
) {
  @Field(() => Int)
  id: number;
}
