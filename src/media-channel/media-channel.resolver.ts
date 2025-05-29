import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MediaChannelsService } from './media-channel.service';
import { MediaChannel } from './models/media-channel.model';
import { CreateMediaChannelInput } from './dto/create-media-channel.input';
import { UpdateMediaChannelInput } from './dto/update-media-channel.input';

@Resolver(() => MediaChannel)
export class MediaChannelsResolver {
  constructor(private readonly service: MediaChannelsService) {}

  @Query(() => [MediaChannel], { name: 'mediaChannels' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => MediaChannel, { name: 'mediaChannel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => MediaChannel)
  create(@Args('input') input: CreateMediaChannelInput) {
    return this.service.create(input);
  }

  @Mutation(() => MediaChannel)
  update(@Args('input') input: UpdateMediaChannelInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id).then(() => true);
  }
}
