import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Client } from 'src/clients/models/client.model';
import { Status } from 'src/status/models/status.model';
import { User } from 'src/users/models/user.model';
import { Meeting } from 'src/meetings/models/meeting.model';
import { Invoice } from 'src/invoices/models/invoice.model';

interface ICampaignCreationAttr {
  client_id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  budget: number;
  status_id: number;
}

@ObjectType()
@Table({ tableName: 'campaigns' })
export class Campaign extends Model<Campaign, ICampaignCreationAttr> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Field(() => Int)
  @ForeignKey(() => Client)
  @Column(DataType.INTEGER)
  declare client_id: number;

  @Field()
  @Column(DataType.STRING)
  declare name: string;

  @Field(() => Date)
  @Column(DataType.DATE)
  declare start_date: Date;

  @Field(() => Date)
  @Column(DataType.DATE)
  declare end_date: Date;

  @Field(() => Float)
  @Column(DataType.DECIMAL)
  declare budget: number;

  @Field(() => Int)
  @ForeignKey(() => Status)
  @Column(DataType.INTEGER)
  declare status_id: number;

  @BelongsTo(() => Status)
  @Field(() => Status)
  status: Status;

  @BelongsTo(() => Client)
  client: Client;

  @HasMany(() => Meeting)
  meetings: Meeting[];

  @HasMany(() => Invoice)
  invoices: Invoice[];
}
