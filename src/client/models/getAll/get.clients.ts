import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

import { Success, SuccessOptions } from 'src/common/models/success';
import { Failure, FailureOptions } from 'src/common/models/failure';

import { ClientModel } from '../client.model';

@ObjectType()
export class GetClientsSuccess extends Success {
  constructor(data: ClientModel[], options?: SuccessOptions) {
    super(options);
    this.data = data;
  }

  @Field(() => [ClientModel])
  data: ClientModel[];
}

@ObjectType()
export class GetClientsFailure extends Failure {
  constructor(options: FailureOptions) {
    super(options);
  }
}

export const GetClientsUnion = createUnionType({
  name: 'GetClientsUnion',
  types: () => [GetClientsSuccess, GetClientsFailure],
});
