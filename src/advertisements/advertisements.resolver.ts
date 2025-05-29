import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdvertisementsService } from './advertisements.service';
import { Advertisement } from './models/advertisement.model';
import { CreateAdvertisementInput } from './dto/create-advertisement.input';
import { UpdateAdvertisementInput } from './dto/update-advertisement.input';

@Resolver(() => Advertisement)
export class AdvertisementsResolver {
  constructor(private readonly service: AdvertisementsService) {}

  @Mutation(() => Advertisement)
  createAdvertisement(@Args('input') input: CreateAdvertisementInput) {
    return this.service.create(input);
  }

  @Query(() => [Advertisement], { name: 'advertisements' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Advertisement, { name: 'advertisement' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Advertisement)
  updateAdvertisement(@Args('input') input: UpdateAdvertisementInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeAdvertisement(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id).then(() => true);
  }
}
