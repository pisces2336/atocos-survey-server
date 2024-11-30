import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(255)
  email: string;

  @Field()
  @MaxLength(255)
  password: string;
}
