import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientModule } from '../client/client.module';
import { InvoiceEntity, ClientEntity } from '../database/postgres/entities';

import { InvoiceService } from './invoice.service';
import { InvoiceResolver } from './invoice.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity, ClientEntity]),
    ClientModule,
  ],
  providers: [InvoiceService, InvoiceResolver],
  exports: [InvoiceService],
})
export class InvoiceModule {}
