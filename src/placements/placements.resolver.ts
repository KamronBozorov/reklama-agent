import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlacementsService } from './placements.service';
import { Placement } from './models/placement.model';
import { CreatePlacementInput } from './dto/create-placement.input';
import { UpdatePlacementInput } from './dto/update-placement.input';

@Resolver(() => Placement)
export class PlacementsResolver {
  constructor(private readonly service: PlacementsService) {}

  @Mutation(() => Placement)
  createPlacement(@Args('input') input: CreatePlacementInput) {
    return this.service.create(input);
  }

  @Query(() => [Placement], { name: 'placements' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Placement, { name: 'placement' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Placement)
  updatePlacement(@Args('input') input: UpdatePlacementInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removePlacement(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
