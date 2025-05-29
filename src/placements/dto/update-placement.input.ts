import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { CreatePlacementInput } from './create-placement.input';

@InputType()
export class UpdatePlacementInput extends PartialType(CreatePlacementInput) {
  @Field(() => Int)
  id: number;
}
