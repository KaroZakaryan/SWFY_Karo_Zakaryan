import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

import { Success, SuccessOptions } from 'src/common/models/success';
import { Failure, FailureOptions } from 'src/common/models/failure';

import { ClientModel } from '../client.model';

@ObjectType()
export class CreateClientSuccess extends Success {
  constructor(
    data: ClientModel,
    options: SuccessOptions = {
      message: 'client created',
    },
  ) {
    super(options);
    this.data = data;
  }

  @Field(() => ClientModel)
  data: ClientModel;
}

@ObjectType()
export class CreateClientFailure extends Failure {
  constructor(options: FailureOptions) {
    super(options);
  }
}

export const CreateClientUnion = createUnionType({
  name: 'CreateClient',
  types: () => [CreateClientSuccess, CreateClientFailure],
});
