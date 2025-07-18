import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Client } from 'src/clients/models/client.model';
import { Campaign } from 'src/campaigns/models/campaign.model';
import { Status } from 'src/status/models/status.model';
import { Payment } from 'src/payments/models/payment.model';
import { PathItemObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

interface IInvoiceCreationAttr {
  client_id: number;
  campaign_id: number;
  amount: number;
  issue_date: Date;
  due_date: Date;
  status_id: number;
}

@ObjectType()
@Table({ tableName: 'invoices' })
export class Invoice extends Model<Invoice, IInvoiceCreationAttr> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Field(() => Int)
  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER })
  declare client_id: number;

  @Field(() => Int)
  @ForeignKey(() => Campaign)
  @Column({ type: DataType.INTEGER })
  declare campaign_id: number;

  @Field(() => Float)
  @Column({ type: DataType.DECIMAL })
  declare amount: number;

  @Field(() => String)
  @Column({ type: DataType.DATEONLY })
  declare issue_date: Date;

  @Field(() => String)
  @Column({ type: DataType.DATEONLY })
  declare due_date: Date;

  @Field(() => Int)
  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER })
  declare status_id: number;

  @BelongsTo(() => Client)
  client: Client;

  @BelongsTo(() => Campaign)
  campaign: Campaign;

  @BelongsTo(() => Status)
  status: Status;

  @HasMany(() => Payment)
  payments: Payment[];
}
