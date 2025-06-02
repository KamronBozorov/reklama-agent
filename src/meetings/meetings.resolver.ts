import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MeetingsService } from './meetings.service';
import { Meeting } from './models/meeting.model';
import { CreateMeetingInput } from './dto/create-meeting.input';
import { UpdateMeetingInput } from './dto/update-meeting.input';

@Resolver(() => Meeting)
export class MeetingsResolver {
  constructor(private readonly service: MeetingsService) {}

  @Query(() => [Meeting], { name: 'meetings' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Meeting, { name: 'meeting' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Meeting)
  createMeeting(@Args('input') input: CreateMeetingInput) {
    return this.service.create(input);
  }

  @Mutation(() => Meeting)
  updateMeeting(@Args('input') input: UpdateMeetingInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeMeeting(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id).then(() => true);
  }
}
