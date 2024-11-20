import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { IsNumber, IsString } from 'class-validator';

import { BaseModel } from '../../common/models/base.model';
import { ClientModel } from '../../client/models/client.model';

@ObjectType()
export class InvoiceLineItemsModel {
  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  amount: number;

  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  price: number;

  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  units: number;

  @Field(() => Float)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  vat: number;
}

@ObjectType()
export class InvoiceModel extends BaseModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  status: string;

  @Field(() => String, { name: 'quote_number' })
  quoteNumber: string;

  @Field(() => [InvoiceLineItemsModel], { name: 'line_items' })
  lineItems: InvoiceLineItemsModel[];

  @Field({ nullable: true, name: 'issued_at' })
  issuedAt?: Date;

  @Field(() => GraphQLJSON, { nullable: true, name: 'customer_data' })
  customerData?: object;

  @Field(() => ClientModel, { nullable: true, name: 'client' })
  client?: ClientModel;
}
