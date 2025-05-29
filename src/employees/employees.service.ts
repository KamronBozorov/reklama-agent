import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee) private employeeModel: typeof Employee) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeModel.create(dto);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.findAll({ include: { all: true } });
  }

  async findOne(user_id: number): Promise<Employee> {
    const emp = await this.employeeModel.findByPk(user_id);
    if (!emp) throw new NotFoundException('Xodim topilmadi');
    return emp;
  }

  async update(user_id: number, dto: UpdateEmployeeDto): Promise<Employee> {
    const emp = await this.findOne(user_id);
    return emp.update(dto);
  }

  async remove(user_id: number): Promise<void> {
    const emp = await this.findOne(user_id);
    await emp.destroy();
  }
}
