import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { PaymentMethodModule } from 'src/payment_method/payment_method.module';
import { StatusModule } from 'src/status/status.module';
import { PaymentsResolver } from './payments.resolver';
import { InvoicesModule } from 'src/invoices/invoices.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment]),
    PaymentMethodModule,
    StatusModule,
    InvoicesModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsResolver],
  exports: [PaymentsService],
})
export class PaymentsModule {}
