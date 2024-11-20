import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString, IsEmail, IsPhoneNumber, Length } from 'class-validator';

import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class ClientModel extends BaseModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @IsString()
  @Length(2, 50)
  name: string;

  @Field(() => String, { description: 'Client email address' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Client phone number' })
  @IsPhoneNumber()
  phoneNumber: string;
}
