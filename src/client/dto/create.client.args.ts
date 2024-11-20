import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsEmail, Length, IsPhoneNumber } from 'class-validator';

@InputType()
export class CreateClientArgs {
  @Field(() => String)
  @IsString()
  @Length(2, 50)
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsPhoneNumber()
  phoneNumber: string;
}
