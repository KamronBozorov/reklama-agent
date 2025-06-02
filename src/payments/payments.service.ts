import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { PaymentMethodService } from 'src/payment_method/payment_method.service';
import { StatusService } from 'src/status/status.service';
import { InvoicesService } from 'src/invoices/invoices.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
    private readonly methodService: PaymentMethodService,
    private readonly statusService: StatusService,
    private readonly invoiceService: InvoicesService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const { method_id, status_id, invoice_id } = createPaymentDto;

    await this.methodService.findOne(method_id);
    await this.statusService.findOne(status_id);
    await this.invoiceService.findOne(invoice_id);

    return await this.paymentModel.create(createPaymentDto);
  }

  async findAll() {
    return await this.paymentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id, {
      include: { all: true },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);

    await payment.update(updatePaymentDto);
    return payment;
  }

  async remove(id: number) {
    const payment = await this.findOne(id);

    await payment.destroy();
    return { message: `Payment with ID ${id} has been deleted` };
  }
}
