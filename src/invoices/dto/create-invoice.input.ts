import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceInput {
  @Field(() => Int)
  client_id: number;

  @Field(() => String)
  invoice_date: Date;

  @Field(() => Float)
  total_amount: number;

  @Field(() => Date)
  due_date: Date;

  @Field(() => Int)
  campaign_id: number;

  @Field(() => Int)
  amount: number;

  @Field(() => Date)
  issue_date: Date;

  @Field(() => Int)
  status_id: number;
}
