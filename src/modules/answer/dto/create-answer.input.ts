import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field()
  submissionId?: string;

  @Field()
  questionId: string;

  @Field()
  @MaxLength(255)
  answerText: string;
}
