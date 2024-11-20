import { createUnionType, ObjectType } from '@nestjs/graphql';

import { Success, SuccessOptions } from 'src/common/models/success';
import { Failure, FailureOptions } from 'src/common/models/failure';

@ObjectType()
export class DeleteClientSuccess extends Success {
  constructor(
    options: SuccessOptions = {
      message: 'client deleted',
    },
  ) {
    super(options);
  }
}

@ObjectType()
export class DeleteClientFailure extends Failure {
  constructor(options: FailureOptions) {
    super(options);
  }
}

export const DeleteClientUnion = createUnionType({
  name: 'DeleteClient',
  types: () => [DeleteClientSuccess, DeleteClientFailure],
});
