import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from './models/invoice.model';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ClientsService } from 'src/clients/clients.service';
import { StatusService } from 'src/status/status.service';
import { CampaignsService } from 'src/campaigns/campaigns.service';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice) private invoiceRepo: typeof Invoice,
    private readonly clientService: ClientsService,
    private readonly statusService: StatusService,
    private readonly campignService: CampaignsService,
  ) {}

  async create(dto: CreateInvoiceDto) {
    const { client_id, status_id, campaign_id } = dto;

    await this.campignService.findOne(campaign_id);
    await this.statusService.findOne(status_id);
    await this.clientService.findOne(client_id);

    return this.invoiceRepo.create(dto);
  }

  async findAll() {
    return this.invoiceRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const invoice = await this.invoiceRepo.findByPk(id, {
      include: { all: true },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');

    return invoice;
  }

  async update(id: number, dto: UpdateInvoiceDto) {
    const invoice = await this.findOne(id);
    return invoice.update(dto);
  }

  async remove(id: number) {
    const invoice = await this.findOne(id);
    return invoice.destroy();
  }
}
