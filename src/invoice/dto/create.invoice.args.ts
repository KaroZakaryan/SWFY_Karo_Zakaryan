import GraphQLJSON from 'graphql-type-json';
import { IsOptional, IsString } from 'class-validator';
import { Field, FieldOptions, InputType, Int } from '@nestjs/graphql';

import { LineItemsArgs } from './line.item.args';

@InputType()
export class CreateInvoiceArgs {
  @Field(() => String, {
    nullable: true,
  } as FieldOptions<string>)
  @IsOptional()
  name?: string;

  @Field(() => [LineItemsArgs], {
    nullable: true,
  } as FieldOptions<[LineItemsArgs]>)
  @IsOptional()
  line_items?: LineItemsArgs[];

  @Field(() => GraphQLJSON, { nullable: true, name: 'customer_data' })
  @IsOptional()
  customerData?: object;

  @Field(() => Int, { nullable: false })
  clientId?: number;

  @Field(() => String, { nullable: false })
  @IsString()
  status: string;

  @Field(() => String, { nullable: false })
  @IsString()
  quoteNumber: string;
}
