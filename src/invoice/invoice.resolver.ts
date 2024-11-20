import { UseFilters } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { InvoiceService } from './invoice.service';
import { InvoiceModel } from './models/invoice.model';
import { CreateInvoiceArgs } from './dto/create.invoice.args';

import { GetByIdArgs } from '../common/dto/get.by.id';
import { HttpExceptionFilter } from '../common/exception/handler';
import { InvoiceNotFoundException } from '../common/exception/invoice.exception';

import {
  CreateInvoiceFailure,
  CreateInvoiceSuccess,
  CreateInvoiceUnion,
} from './models/create/create.invoice.model';
import {
  GetInvoiceFailure,
  GetInvoiceSuccess,
  GetInvoiceUnion,
} from './models/getById/get.invoice';
import {
  GetInvoicesByClientFailure,
  GetInvoicesByClientSuccess,
  GetInvoicesByClientUnion,
} from './models/getByClientId/get.invoice.by.client';
import { GetInvoicesByClientArgs } from './dto/get.invoices.by.client.args';

@Resolver(() => InvoiceModel)
export class InvoiceResolver {
  constructor(private readonly service: InvoiceService) {}

  @Query(() => GetInvoiceUnion)
  @UseFilters(new HttpExceptionFilter(GetInvoiceFailure))
  public async getQuote(
    @Args('args', { type: () => GetByIdArgs }) args: GetByIdArgs,
  ) {
    try {
      const entity = await this.service.findById(args.id);
      const data = entity ? plainToInstance(InvoiceModel, entity) : null;

      if (data) {
        return new GetInvoiceSuccess(data);
      }
      throw new InvoiceNotFoundException();
    } catch (e) {
      return new GetInvoiceFailure({ message: e.message });
    }
  }

  @Query(() => GetInvoicesByClientUnion)
  @UseFilters(new HttpExceptionFilter(GetInvoicesByClientFailure))
  public async getInvoicesByClient(
    @Args('args', { type: () => GetInvoicesByClientArgs })
    args: GetInvoicesByClientArgs,
  ) {
    try {
      const entities = await this.service.findByClient(args.clientId);
      const data = entities.map((entity) =>
        plainToInstance(InvoiceModel, entity),
      );

      if (data.length > 0) {
        return new GetInvoicesByClientSuccess(data);
      }

      throw new InvoiceNotFoundException();
    } catch (e) {
      return new GetInvoicesByClientFailure({ message: e.message });
    }
  }

  @UseFilters(new HttpExceptionFilter(CreateInvoiceFailure))
  @Mutation(() => CreateInvoiceUnion)
  public async createInvoice(
    @Args('args', { type: () => CreateInvoiceArgs }) args: CreateInvoiceArgs,
  ) {
    try {
      const entity = await this.service.create(args);
      const data = entity ? plainToInstance(InvoiceModel, entity) : null;

      if (data) {
        return new CreateInvoiceSuccess(data);
      }

      throw new InvoiceNotFoundException();
    } catch (e) {
      return new CreateInvoiceFailure({ message: e.message });
    }
  }
}
