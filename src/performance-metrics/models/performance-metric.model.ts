import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Advertisement } from 'src/advertisements/models/advertisement.model';

interface IPerformanceMetricCreationAttr {
  ad_id: number;
  impressions: number;
  clicks: number;
  conversions: number;
  date: Date;
}

@ObjectType()
@Table({ tableName: 'performance_metrics' })
export class PerformanceMetric extends Model<
  PerformanceMetric,
  IPerformanceMetricCreationAttr
> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Field(() => Int)
  @ForeignKey(() => Advertisement)
  @Column(DataType.INTEGER)
  declare ad_id: number;

  @Field(() => Int)
  @Column(DataType.INTEGER)
  declare impressions: number;

  @Field(() => Int)
  @Column(DataType.INTEGER)
  declare clicks: number;

  @Field(() => Int)
  @Column(DataType.INTEGER)
  declare conversions: number;

  @Field(() => Date)
  @Column(DataType.DATE)
  declare date: Date;

  @BelongsTo(() => Advertisement)
  declare advertisement: Advertisement;
}
