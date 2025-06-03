import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { Role } from 'src/roles/models/role.model';
import { EmployeeRole } from 'src/employee-role/models/employee-role.model';
import { Department } from 'src/deparment/models/deparment.model';

interface IEmployeeCreationAttr {
  user_id: number;
  department_id?: number;
  hire_date: Date;
  experience: string;
}

@ObjectType()
@Table({ tableName: 'employees' })
export class Employee extends Model<Employee, IEmployeeCreationAttr> {
  @Field(() => Int)
  @ForeignKey(() => User)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  declare user_id: number;

  @ForeignKey(() => Department)
  @Field(() => Int, { nullable: true })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare department_id: number;

  @Field(() => Date)
  @Column({ type: DataType.DATE })
  declare hire_date: Date;

  @Field()
  @Column({ type: DataType.STRING })
  declare experience: string;

  @BelongsToMany(() => Role, () => EmployeeRole)
  roles: Role[];

  @BelongsTo(() => Department)
  department: Department;
}
