import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateOptionInput {
  @Field()
  displayOrder: number;

  @Field()
  @MaxLength(255)
  label: string;
}
