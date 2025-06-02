import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateMeetingInput {
  @Field(() => Int)
  campaign_id: number;

  @Field()
  date: Date;

  @Field()
  agenda: string;

  @Field()
  minutes: string;
}
