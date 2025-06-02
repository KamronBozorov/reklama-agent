import { CreateInvoiceInput } from './create-invoice.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {
  @Field(() => Int, { description: 'ID sini kiriting' })
  id: number;
}
