import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './models/campaign.model';
import { CreateCampaignInput } from './dto/create-campaign.input';
import { UpdateCampaignInput } from './dto/update-campaign.input';

@Resolver(() => Campaign)
export class CampaignsResolver {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Mutation(() => Campaign)
  createCampaign(@Args('input') input: CreateCampaignInput) {
    return this.campaignsService.create(input);
  }

  @Query(() => [Campaign], { name: 'campaigns' })
  findAll() {
    return this.campaignsService.findAll();
  }

  @Query(() => Campaign, { name: 'campaign' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.campaignsService.findOne(id);
  }

  @Mutation(() => Campaign)
  updateCampaign(@Args('input') input: UpdateCampaignInput) {
    return this.campaignsService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeCampaign(@Args('id', { type: () => Int }) id: number) {
    return this.campaignsService.remove(id).then(() => true);
  }
}
