import { Field, InputType } from '@nestjs/graphql';
import { CreateAnswerInput } from 'src/modules/answer/dto/create-answer.input';

@InputType()
export class CreateSubmissionInput {
  @Field()
  surveyId: string;

  @Field()
  ipAddress: string;

  @Field()
  answers: CreateAnswerInput[];
}
