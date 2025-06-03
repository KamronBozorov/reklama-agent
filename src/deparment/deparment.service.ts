import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from './models/deparment.model';
import { CreateDepartmentDto } from './dto/create-deparment.dto';
import { UpdateDeparmentDto } from './dto/update-deparment.dto';

@Injectable()
export class DepartmentsService {
  constructor(@InjectModel(Department) private model: typeof Department) {}

  async create(dto: CreateDepartmentDto): Promise<Department> {
    return this.model.create(dto);
  }

  async findAll(): Promise<Department[]> {
    return this.model.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Department> {
    const dept = await this.model.findByPk(id, { include: { all: true } });
    if (!dept) throw new NotFoundException('Bo‘lim topilmadi');
    return dept;
  }

  async update(id: number, dto: UpdateDeparmentDto): Promise<Department> {
    const dept = await this.findOne(id);
    return dept.update(dto);
  }

  async remove(id: number): Promise<void> {
    const dept = await this.findOne(id);
    await dept.destroy();
  }
}
