import { Resolver } from '@nestjs/graphql';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}
}
