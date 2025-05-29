import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMediaChannelInput {
  @Field() name: string;
  @Field() type: string;
  @Field() contact_info: string;
}
