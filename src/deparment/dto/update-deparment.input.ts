import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateDepartmentInput } from './create-deparment.input';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => Int)
  id: number;
}
