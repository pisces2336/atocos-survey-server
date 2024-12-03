import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { CreateOptionInput } from 'src/modules/option/dto/create-option.input';

@InputType()
export class CreateQuestionInput {
  @Field()
  displayOrder: number;

  @Field(() => String)
  type: 'SingleSelection' | 'MultipleSelection' | 'FreeText';

  @Field()
  @MaxLength(255)
  questionnaire: string;

  @Field()
  options: CreateOptionInput[];
}
