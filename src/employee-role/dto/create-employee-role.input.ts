import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeRoleInput {
  @Field(() => Int)
  employee_id: number;

  @Field(() => Int)
  role_id: number;
}
