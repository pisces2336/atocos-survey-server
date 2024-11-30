import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
