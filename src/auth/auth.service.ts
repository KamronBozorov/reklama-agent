import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ClientsService } from 'src/clients/clients.service';
import { SignUpClientDto } from './dto/sign-up.client.dto';
import { annotateModelWithIndex, Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from 'src/clients/models/client.model';
import { User } from 'src/users/models/user.model';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Employee } from 'src/employees/models/employee.model';
import { SignUpEmployeeDto } from './dto/sign-up.employee.dto';
import { retry } from 'rxjs';
import { Department } from 'src/deparment/models/deparment.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Client) private clientModel: typeof Client,
    @InjectModel(Employee) private employeeModel: typeof Employee,
    @InjectModel(Department) private departmentModel: typeof Department,
    @InjectModel(User) private userModel: typeof User,
    private readonly sequelize: Sequelize,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async signUpClient(dto: SignUpClientDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const { email, password, confirm_password } = dto;

      if (password !== confirm_password)
        throw new UnprocessableEntityException('Passwords not matched');

      const userCandidate = await this.userModel.findOne({ where: { email } });

      if (userCandidate) throw new ConflictException('User already exists');

      const user = await this.userModel.create(dto, { transaction });

      const candidateClient = await this.clientModel.create(
        { ...dto, user_id: user.id },
        {
          transaction,
        },
      );

      await this.mailService.sendMail({
        name: user.name,
        email: user.email,
        activation_link: candidateClient.activation_link,
      });

      const returnData = {
        message: 'Activation link sent to your email',
      };

      transaction.commit();
      return returnData;
    } catch (error) {
      console.error('Error occurred:', error);
      transaction.rollback();
      throw error;
    }
  }

  async activate(link: string) {
    const client = await this.clientModel.findOne({
      where: { activation_link: link },
    });

    if (!client) throw new NotFoundException('Client not found');

    const user = await this.userModel.findByPk(client.user_id);

    if (user?.is_active) throw new BadRequestException('You already active');

    await this.userModel.update(
      { is_active: true },
      { where: { id: client.user_id } },
    );

    return { message: 'You successfully activated' };
  }

  async clientSignIn(dto, res: Response) {
    const { email, password } = dto;

    if (!email || !password)
      throw new NotFoundException('Email or password not given');

    const user = await this.userModel.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    const client = await this.clientModel.findByPk(user.id);

    if (!client) throw new NotFoundException('Client not found');

    const payload = {
      sub: user.id,
      email: user.email,
      is_active: user.is_active,
      role: ['client'],
    };

    const tokens = await this.generateTokens(payload);

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 112222222,
      httpOnly: true,
    });

    user.refresh_token = tokens.refreshToken;
    user.save();

    return {
      message: 'You have successfully loged in',
      accessToken: tokens.accessToken,
    };
  }

  async signUpEmployee(dto: SignUpEmployeeDto) {
    const { email, password, confirm_password, department_id } = dto;

    const transaction = await this.sequelize.transaction();

    const department = await this.departmentModel.findByPk(department_id);

    if (!department) throw new NotFoundException('Department not found');
    try {
      if (password !== confirm_password)
        throw new UnprocessableEntityException('Passwords not matched');

      const userCandidate = await this.userModel.findOne({ where: { email } });

      if (userCandidate) throw new ConflictException('User already exists');

      const user = await this.userModel.create({ ...dto }, { transaction });

      const candidateEmployee = await this.employeeModel.create(
        { ...dto, user_id: user.id },
        {
          transaction,
        },
      );

      const returnData = {
        message: `You have signed up successfully ID ${candidateEmployee.user_id}`,
      };

      await transaction.commit();
      user.is_active = true;
      await user.save();

      return returnData;
    } catch (error) {
      console.error('Error occurred:', error);
      transaction.rollback();
      throw error;
    }
  }

  async singInEmployee(dto, res: Response) {
    const { email, password } = dto;

    if (!email || !password)
      throw new NotFoundException('Email or password not given');

    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found');

    const employee = await this.employeeModel.findByPk(user.id, {
      include: { all: true },
    });

    if (!employee) throw new NotFoundException('Employee not found');

    const roles = employee.toJSON().roles.map((role) => role.name);

    const payload = {
      sub: user.id,
      email: user.email,
      is_active: user.is_active,
      roles: roles.length ? roles : ['employee'],
    };

    const tokens = await this.generateTokens(payload);

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 112222222,
      httpOnly: true,
    });

    user.refresh_token = tokens.refreshToken;
    user.save();

    return {
      message: 'You have successfully loged in',
      accessToken: tokens.accessToken,
    };
  }

  async generateTokens(payload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return { accessToken, refreshToken };
  }

  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken)
      throw new UnauthorizedException('You have not logged in yet!');

    const user = await this.userModel.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!user) throw new NotFoundException('User not found');

    res.clearCookie('refresh_token');
    user.refresh_token = '';
    await user.save();

    return { message: 'Logged out successfully' };
  }
}
