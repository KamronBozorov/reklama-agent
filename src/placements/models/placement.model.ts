import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Advertisement } from 'src/advertisements/models/advertisement.model';
import { Status } from 'src/status/models/status.model';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { MediaChannel } from 'src/media-channel/models/media-channel.model';

interface IPlacementCreationAttr {
  ad_id: number;
  channel_id: number;
  placement_date: Date;
  cost: number;
  status_id: number;
}

@ObjectType()
@Table({ tableName: 'placements' })
export class Placement extends Model<Placement, IPlacementCreationAttr> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Field(() => Int)
  @ForeignKey(() => Advertisement)
  @Column(DataType.INTEGER)
  declare ad_id: number;

  @ForeignKey(() => MediaChannel)
  @Field(() => Int)
  @Column(DataType.INTEGER)
  declare channel_id: number;

  @Field(() => Date)
  @Column(DataType.DATE)
  declare placement_date: Date;

  @Field(() => Float)
  @Column(DataType.DECIMAL)
  declare cost: number;

  @ForeignKey(() => Status)
  @Column(DataType.INTEGER)
  status_id: number;

  @BelongsTo(() => Advertisement)
  advertisement: Advertisement;

  @BelongsTo(() => Status)
  status: Status;

  @BelongsTo(() => MediaChannel)
  media_channel: MediaChannel;
}
