import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { StatusModule } from 'src/status/status.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [SequelizeModule.forFeature([Client]), StatusModule, MailModule],
  controllers: [],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
