import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { Payment } from './models/payment.model';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => Payment, { description: 'Yangi to‘lov yaratish' })
  createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    return this.paymentsService.create(createPaymentInput);
  }

  @Query(() => [Payment], {
    name: 'payments',
    description: 'Barcha to‘lovlar ro‘yxati',
  })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Query(() => Payment, {
    name: 'payment',
    description: 'Bitta to‘lovni olish',
  })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentsService.findOne(id);
  }

  @Mutation(() => String, { description: 'To‘lovni o‘chirish' })
  removePayment(@Args('id', { type: () => Int }) id: number) {
    return this.paymentsService
      .remove(id)
      .then(() => `Payment #${id} o‘chirildi`);
  }
}
