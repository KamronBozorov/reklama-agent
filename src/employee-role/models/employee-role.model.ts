import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Employee } from 'src/employees/models/employee.model';
import { Role } from 'src/roles/models/role.model';

interface IEmployeeRoleCreationAttr {
  employee_id: number;
  role_id: number;
}

@Table({ tableName: 'employee_role', timestamps: false })
export class EmployeeRole extends Model<
  EmployeeRole,
  IEmployeeRoleCreationAttr
> {
  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  declare employee_id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  declare role_id: number;
}
