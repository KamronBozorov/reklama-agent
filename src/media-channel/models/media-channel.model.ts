import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';

interface IMediaChannelCreationAttr {
  name: string;
  type: string;
  contact_info: string;
}

@ObjectType()
@Table({ tableName: 'media_channels' })
export class MediaChannel extends Model<
  MediaChannel,
  IMediaChannelCreationAttr
> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Field()
  @Column(DataType.STRING)
  declare name: string;

  @Field()
  @Column(DataType.STRING)
  declare type: string;

  @Field()
  @Column(DataType.STRING)
  declare contact_info: string;
}
