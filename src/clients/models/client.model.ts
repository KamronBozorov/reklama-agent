import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Campaign } from 'src/campaigns/models/campaign.model';
import { User } from 'src/users/models/user.model';

interface IClientCreationAttr {
  user_id: number;
  industry: string;
  contact_info: string;
}

@Table({ tableName: 'clients' })
export class Client extends Model<Client, IClientCreationAttr> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare industry: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare contact_info: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4(),
    unique: true,
  })
  declare activation_link: string;

  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => Campaign)
  campaigns: Campaign[];
}
