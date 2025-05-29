import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare email: string;
  @Column({
    type: DataType.STRING,
  })
  declare password: string;
  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;
}
