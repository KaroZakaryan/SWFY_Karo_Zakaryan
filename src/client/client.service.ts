import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InvoiceEntity, ClientEntity } from '../database/postgres/entities';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,

    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async create(clientData: Partial<ClientEntity>): Promise<ClientEntity> {
    const client = this.clientRepository.create(clientData);

    return this.clientRepository.save(client);
  }

  async findAll(): Promise<ClientEntity[]> {
    return this.clientRepository.find();
  }

  async findById(id: number): Promise<ClientEntity | undefined> {
    return this.clientRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateData: Partial<ClientEntity>,
  ): Promise<ClientEntity | undefined> {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      return undefined;
    }

    Object.assign(client, updateData);

    return this.clientRepository.save(client);
  }

  async delete(id: number): Promise<boolean> {
    const client = await this.clientRepository.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.invoiceRepository.delete({ client: { id } });

    const result = await this.clientRepository.delete(id);

    return result.affected !== 0;
  }
}
