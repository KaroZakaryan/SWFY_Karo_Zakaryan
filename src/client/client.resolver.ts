import { UseFilters } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GetByIdArgs } from '../common/dto/get.by.id';
import { HttpExceptionFilter } from '../common/exception/handler';
import { ClientNotFoundException } from '../common/exception/client.exception';

import { ClientService } from './client.service';
import { ClientModel } from './models/client.model';
import {
  CreateClientUnion,
  CreateClientFailure,
  CreateClientSuccess,
} from './models/create/create.client.model';
import {
  GetClientUnion,
  GetClientFailure,
  GetClientSuccess,
} from './models/getById/get.client';
import { CreateClientArgs } from './dto/create.client.args';
import {
  GetClientsFailure,
  GetClientsSuccess,
  GetClientsUnion,
} from './models/getAll/get.clients';
import {
  DeleteClientFailure,
  DeleteClientSuccess,
  DeleteClientUnion,
} from './models/delete/delete.client.model';

@Resolver(() => ClientModel)
export class ClientResolver {
  constructor(private readonly service: ClientService) {}

  @Query(() => GetClientUnion)
  @UseFilters(new HttpExceptionFilter(GetClientFailure))
  public async getClient(
    @Args('args', { type: () => GetByIdArgs }) args: GetByIdArgs,
  ) {
    try {
      const entity = await this.service.findById(args.id);
      const data = entity ? plainToInstance(ClientModel, entity) : null;

      if (data) {
        return new GetClientSuccess(data);
      }
      throw new ClientNotFoundException();
    } catch (e) {
      return new GetClientFailure({ message: e.message });
    }
  }

  @Query(() => GetClientsUnion)
  @UseFilters(new HttpExceptionFilter(GetClientsFailure))
  public async getClients() {
    try {
      const entities = await this.service.findAll();
      const data = entities.map((entity) =>
        plainToInstance(ClientModel, entity),
      );

      return new GetClientsSuccess(data);
    } catch (e) {
      return new GetClientsFailure({ message: e.message });
    }
  }

  @UseFilters(new HttpExceptionFilter(CreateClientFailure))
  @Mutation(() => CreateClientUnion)
  public async createClient(
    @Args('args', { type: () => CreateClientArgs }) args: CreateClientArgs,
  ) {
    try {
      const entity = await this.service.create(args);
      const data = entity ? plainToInstance(ClientModel, entity) : null;

      if (data) {
        return new CreateClientSuccess(data);
      }

      throw new ClientNotFoundException();
    } catch (e) {
      return new CreateClientFailure({ message: e.message });
    }
  }

  @Mutation(() => DeleteClientUnion)
  @UseFilters(new HttpExceptionFilter(DeleteClientFailure))
  public async deleteClient(
    @Args('args', { type: () => GetByIdArgs }) args: GetByIdArgs,
  ) {
    try {
      const result = await this.service.delete(args.id);
      if (result) {
        return new DeleteClientSuccess();
      }
      throw new ClientNotFoundException();
    } catch (e) {
      return new DeleteClientFailure({ message: e.message });
    }
  }
}
