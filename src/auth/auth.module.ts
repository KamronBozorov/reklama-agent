import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ClientsModule } from 'src/clients/clients.module';
import { MailModule } from 'src/mail/mail.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { Client } from 'src/clients/models/client.model';
import { Employee } from 'src/employees/models/employee.model';
import { Department } from 'src/deparment/models/deparment.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Client, Employee, Department]),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
