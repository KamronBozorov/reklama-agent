import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsTo,
} from 'sequelize-typescript';
import { Campaign } from 'src/campaigns/models/campaign.model';

interface IMeetingCreationAttr {
  campaign_id: number;
  date: Date;
  agenda: string;
  minutes: string;
}

@ObjectType()
@Table({ tableName: 'meetings' })
export class Meeting extends Model<Meeting, IMeetingCreationAttr> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Field(() => Int)
  @ForeignKey(() => Campaign)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare campaign_id: number;

  @Field(() => Date)
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare date: Date;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare agenda: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare minutes: string;

  @BelongsTo(() => Campaign)
  declare campaign: Campaign;
}
