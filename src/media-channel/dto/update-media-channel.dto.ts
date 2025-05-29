import { PartialType } from '@nestjs/swagger';
import { CreateMediaChannelDto } from './create-media-channel.dto';

export class UpdateMediaChannelDto extends PartialType(CreateMediaChannelDto) {}
