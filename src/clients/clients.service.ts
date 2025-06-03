import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { StatusService } from 'src/status/status.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client) private clientModel: typeof Client,
    private readonly statusService: StatusService,
  ) {}

  async create(createClientDto: CreateClientDto, transaction): Promise<Client> {
    return this.clientModel.create(createClientDto, { transaction });
  }

  async findAll(): Promise<Client[]> {
    return await this.clientModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientModel.findByPk(id, {
      include: { all: true },
    });
    if (!client) {
      throw new NotFoundException(`Mijoz ID ${id} topilmadi`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    return await client.update(updateClientDto);
  }

  async remove(id: number): Promise<void> {
    const client = await this.findOne(id);
    await client.destroy();
  }
}
