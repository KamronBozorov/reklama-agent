import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field()
  @IsString()
  name: string;
}
