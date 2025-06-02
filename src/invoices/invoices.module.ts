import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invoice } from './models/invoice.model';
import { StatusModule } from 'src/status/status.module';
import { ClientsModule } from 'src/clients/clients.module';
import { CampaignsModule } from 'src/campaigns/campaigns.module';
import { InvoicesResolver } from './invoices.resolver';

@Module({
  imports: [
    SequelizeModule.forFeature([Invoice]),
    StatusModule,
    ClientsModule,
    CampaignsModule,
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesResolver],
  exports: [InvoicesService],
})
export class InvoicesModule {}
