import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { OverdueDto } from './dto/overdue.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly sequelize: Sequelize,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    return await user.update(updateUserDto);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async getTotal() {
    const result = await this.sequelize.query(
      `
      SELECT 
        u.name AS client_name,
        SUM(p.amount) AS total_paid
      FROM users u
      JOIN clients c ON c.user_id = u.id
      JOIN invoices i ON i.client_id = c.user_id
      LEFT JOIN payments p ON p.invoice_id = i.id
      GROUP BY u.name
      ORDER BY total_paid DESC;
      `,
      { type: QueryTypes.SELECT },
    );

    return result;
  }

  async overdueInvoices(dto: OverdueDto) {
    const data = await this.sequelize.query(
      `
SELECT 
	u.name AS client_name,
  	i.amount,
  	i.due_date,
  	i.issue_date 
FROM invoices i 
JOIN clients c ON c.user_id = i.client_id 
JOIN users u ON u.id = c.user_id 
WHERE i.due_date < '${dto.date}' 
`,
      { type: QueryTypes.SELECT },
    );

    return data;
  }

  async employeeRoles() {
    const data = await this.sequelize.query(
      `
SELECT u.name, STRING_AGG(r.name, ', ') AS roles
FROM employees e
JOIN users u ON u.id = e.user_id
JOIN department d ON d.id = e.department_id
JOIN employee_role er ON er.employee_id = e.user_id
JOIN roles r ON er.role_id = r.id
GROUP BY u.name, d.name
ORDER BY u.name;
`,
      { type: QueryTypes.SELECT },
    );

    return data;
  }
}
