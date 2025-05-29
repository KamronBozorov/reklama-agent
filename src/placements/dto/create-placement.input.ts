// create-placement.input.ts
import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreatePlacementInput {
  @Field(() => Int) ad_id: number;
  @Field(() => Int) channel_id: number;
  @Field() placement_date: Date;
  @Field(() => Float) cost: number;
  @Field(() => Int) status_id: number;
}
