import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientEntity, InvoiceEntity } from '../database/postgres/entities';

import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, InvoiceEntity])],
  providers: [ClientService, ClientResolver],
  exports: [ClientService, TypeOrmModule],
})
export class ClientModule {}
