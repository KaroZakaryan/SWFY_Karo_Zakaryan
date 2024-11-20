import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

import { Success, SuccessOptions } from 'src/common/models/success';
import { Failure, FailureOptions } from 'src/common/models/failure';

import { InvoiceModel } from '../invoice.model';

@ObjectType()
export class GetInvoicesByClientSuccess extends Success {
  constructor(data: InvoiceModel[], options?: SuccessOptions) {
    super(options);
    this.data = data;
  }

  @Field(() => [InvoiceModel])
  data: InvoiceModel[];
}

@ObjectType()
export class GetInvoicesByClientFailure extends Failure {
  constructor(options: FailureOptions) {
    super(options);
  }
}

export const GetInvoicesByClientUnion = createUnionType({
  name: 'GetInvoicesByClientUnion',
  types: () => [GetInvoicesByClientSuccess, GetInvoicesByClientFailure],
});
