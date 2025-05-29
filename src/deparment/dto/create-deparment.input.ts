import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsString()
  name: string;
}
