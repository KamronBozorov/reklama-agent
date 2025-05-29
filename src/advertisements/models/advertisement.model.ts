import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Campaign } from 'src/campaigns/models/campaign.model';
import { Placement } from 'src/placements/models/placement.model';
import { Status } from 'src/status/models/status.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

interface IAdvertisementCreationAttr {
  campaign_id: number;
  title: string;
  content: string;
  media_type: string;
  target_audience: string;
  status_id: number;
}

@ObjectType()
@Table({ tableName: 'advertisements' })
export class Advertisement extends Model<
  Advertisement,
  IAdvertisementCreationAttr
> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Field(() => Int)
  @ForeignKey(() => Campaign)
  @Column(DataType.INTEGER)
  declare campaign_id: number;

  @Field()
  @Column(DataType.STRING)
  declare title: string;

  @Field()
  @Column(DataType.TEXT)
  declare content: string;

  @Field()
  @Column(DataType.STRING)
  declare media_type: string;

  @Field()
  @Column(DataType.STRING)
  declare target_audience: string;

  @ForeignKey(() => Status)
  @Column(DataType.INTEGER)
  declare status_id: number;

  @BelongsTo(() => Campaign)
  declare campaign: Campaign;

  @BelongsTo(() => Status)
  declare status: Status;

  @HasMany(() => Placement)
  declare placements: Placement[];
}
