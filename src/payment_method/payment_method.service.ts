import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentMethod } from './models/payment_method.model';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod)
    private paymentMethodRepo: typeof PaymentMethod,
  ) {}

  async create(dto: CreatePaymentMethodDto) {
    return this.paymentMethodRepo.create(dto);
  }

  findAll() {
    return this.paymentMethodRepo.findAll();
  }

  async findOne(id: number) {
    const method = await this.paymentMethodRepo.findByPk(id);
    if (!method) throw new NotFoundException('To‘lov usuli topilmadi');
    return method;
  }

  async update(id: number, dto: UpdatePaymentMethodDto) {
    const method = await this.findOne(id);
    return method.update(dto);
  }

  async remove(id: number) {
    const method = await this.findOne(id);
    await method.destroy();
    return { message: 'To‘lov usuli o‘chirildi' };
  }
}
