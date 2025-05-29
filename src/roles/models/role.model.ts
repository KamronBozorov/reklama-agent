import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employees/models/employee.model';
import { EmployeeRole } from 'src/employee-role/models/employee-role.model';

interface IRoleCreationAttr {
  name: string;
}

@ObjectType()
@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttr> {
  @Field(() => Int)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Field()
  @Column({ type: DataType.STRING })
  declare name: string;

  @BelongsToMany(() => Employee, () => EmployeeRole)
  employees: Employee[];
}
