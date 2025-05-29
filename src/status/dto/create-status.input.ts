import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStatusInput {
  @Field()
  name: string;

  @Field()
  table_name: string;
}
