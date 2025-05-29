import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Campaign } from 'src/campaigns/models/campaign.model';
import { Advertisement } from 'src/advertisements/models/advertisement.model';
import { Placement } from 'src/placements/models/placement.model';

interface IStatusCreationAttr {
  name: string;
  table_name: string;
}

@ObjectType()
@Table({ tableName: 'status' })
export class Status extends Model<Status, IStatusCreationAttr> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Field()
  @Column({ type: DataType.STRING })
  declare name: string;

  @Field()
  @Column({ type: DataType.STRING })
  declare table_name: string;

  @HasMany(() => Campaign)
  campaigns: Campaign[];

  @HasMany(() => Advertisement)
  advertisements: Advertisement[];

  @HasMany(() => Placement)
  placements: Placement[];
}
