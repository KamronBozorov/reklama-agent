import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StatusService } from './status.service';
import { Status } from './models/status.model';
import { CreateStatusInput } from './dto/create-status.input';
import { UpdateStatusInput } from './dto/update-status.input';

@Resolver(() => Status)
export class StatusResolver {
  constructor(private readonly statusService: StatusService) {}

  @Mutation(() => Status)
  createStatus(
    @Args('createStatusInput') createStatusInput: CreateStatusInput,
  ) {
    return this.statusService.create(createStatusInput);
  }

  @Query(() => [Status], { name: 'statusList' })
  findAll() {
    return this.statusService.findAll();
  }

  @Query(() => Status, { name: 'status' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.statusService.findOne(id);
  }

  @Mutation(() => Status)
  updateStatus(
    @Args('updateStatusInput') updateStatusInput: UpdateStatusInput,
  ) {
    return this.statusService.update(updateStatusInput.id, updateStatusInput);
  }

  @Mutation(() => Boolean)
  removeStatus(@Args('id', { type: () => Int }) id: number) {
    return this.statusService.remove(id).then(() => true);
  }
}
