// create-advertisement.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateAdvertisementInput {
  @Field(() => Int) campaign_id: number;
  @Field() title: string;
  @Field() content: string;
  @Field() media_type: string;
  @Field() target_audience: string;
  @Field(() => Int) status_id: number;
}
