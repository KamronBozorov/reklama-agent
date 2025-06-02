import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PaymentMethod } from 'src/payment_method/models/payment_method.model';
import { Status } from 'src/status/models/status.model';

interface IPaymentCreationAttr {
  invoice_id: number;
  payment_date: Date;
  amount: number;
  method_id: number;
  status_id: number;
}

@ObjectType()
@Table({ tableName: 'payments' })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Field(() => Int)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare invoice_id: number;

  @ForeignKey(() => PaymentMethod)
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare method_id: number;

  @Field(() => Int)
  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare status_id: number;

  @Field(() => Date)
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare payment_date: Date;

  @Field(() => Int)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare amount: number;

  @BelongsTo(() => Status)
  status: Status;

  @BelongsTo(() => PaymentMethod)
  paymentMethod: PaymentMethod;
}
