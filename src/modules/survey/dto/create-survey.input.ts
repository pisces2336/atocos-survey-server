import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { CreateQuestionInput } from 'src/modules/question/dto/create-question.input';

@InputType()
export class CreateSurveyInput {
  @Field()
  @MaxLength(255)
  title: string;

  @Field()
  @MaxLength(255)
  description: string;

  @Field()
  questions: CreateQuestionInput[];
}
