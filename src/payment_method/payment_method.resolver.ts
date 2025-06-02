import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { PaymentMethodService } from './payment_method.service';
import { PaymentMethod } from './models/payment_method.model';
import { CreatePaymentMethodInput } from './dto/create-payment_method.input';
import { UpdatePaymentMethodInput } from './dto/update-payment_method.input';

@Resolver(() => PaymentMethod)
export class PaymentMethodResolver {
  constructor(private readonly service: PaymentMethodService) {}

  @Mutation((returns) => PaymentMethod)
  createPaymentMethod(@Args('input') input: CreatePaymentMethodInput) {
    return this.service.create(input);
  }

  @Query(() => [PaymentMethod])
  findAllPaymentMethods() {
    return this.service.findAll();
  }

  @Query(() => PaymentMethod)
  findOnePaymentMethod(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => PaymentMethod)
  updatePaymentMethod(@Args('input') input: UpdatePaymentMethodInput) {
    return this.service.update(input.id, input);
  }

  @Mutation(() => String)
  removePaymentMethod(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id).then(() => 'Deleted');
  }
}
