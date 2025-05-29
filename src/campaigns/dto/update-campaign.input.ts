import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCampaignInput } from './create-campaign.input';

@InputType()
export class UpdateCampaignInput extends PartialType(CreateCampaignInput) {
  @Field(() => Int)
  id: number;
}
