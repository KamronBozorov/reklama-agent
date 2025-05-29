import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { CreateMediaChannelInput } from './create-media-channel.input';

@InputType()
export class UpdateMediaChannelInput extends PartialType(
  CreateMediaChannelInput,
) {
  @Field(() => Int)
  id: number;
}
