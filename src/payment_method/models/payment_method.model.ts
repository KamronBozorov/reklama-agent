import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Payment } from 'src/payments/models/payment.model';

interface IPaymentMethodCreationAttr {
  name: string;
}

@ObjectType()
@Table({ tableName: 'payment_methods' })
export class PaymentMethod extends Model<
  PaymentMethod,
  IPaymentMethodCreationAttr
> {
  @Field(() => Int, { description: "To'lov turi ID si" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Field(() => String, { description: "To'lov turi nomi" })
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @HasMany(() => Payment)
  payments: Payment[];
}
