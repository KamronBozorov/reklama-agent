import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employees/models/employee.model';

interface IDepartmentCreationAttr {
  name: string;
}

@ObjectType()
@Table({ tableName: 'department' })
export class Department extends Model<Department, IDepartmentCreationAttr> {
  @Field(() => Int)
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @Field()
  @Column({ type: DataType.STRING })
  declare name: string;

  @HasMany(() => Employee)
  employees: Employee[];
}
