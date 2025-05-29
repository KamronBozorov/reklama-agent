import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private model: typeof Role) {}

  async create(dto: CreateRoleDto): Promise<Role> {
    return this.model.create(dto);
  }

  async findAll(): Promise<Role[]> {
    return this.model.findAll();
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.model.findByPk(id);
    if (!role) throw new NotFoundException('Rol topilmadi');
    return role;
  }

  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    return role.update(dto);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await role.destroy();
  }
}
