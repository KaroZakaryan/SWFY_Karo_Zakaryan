import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ClientService } from '../client/client.service';
import { InvoiceEntity } from '../database/postgres/entities';

import { plainToInstance } from 'class-transformer';
import { InvoiceModel } from './models/invoice.model';
import { CreateInvoiceArgs } from './dto/create.invoice.args';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
    private readonly clientService: ClientService,
  ) {}

  async findById(id: number): Promise<InvoiceEntity> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['client'],
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    return invoice;
  }

  async create(invoiceData: CreateInvoiceArgs): Promise<InvoiceModel> {
    const client = await this.clientService.findById(invoiceData.clientId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const invoice = this.invoiceRepository.create({
      ...invoiceData,
      client,
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);
    return plainToInstance(InvoiceModel, savedInvoice);
  }

  async findAll(): Promise<InvoiceModel[]> {
    const invoices = await this.invoiceRepository.find({
      relations: ['client'],
    });

    return invoices.map((invoice) => plainToInstance(InvoiceModel, invoice));
  }

  async findByClient(clientId: number): Promise<InvoiceModel[]> {
    const invoices = await this.invoiceRepository.find({
      where: { client: { id: clientId } },
      relations: ['client'],
    });

    return invoices.map((invoice) => plainToInstance(InvoiceModel, invoice));
  }
}
