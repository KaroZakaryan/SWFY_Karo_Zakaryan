import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class GetInvoicesByClientArgs {
  @Field(() => Int)
  @IsInt()
  clientId: number;
}