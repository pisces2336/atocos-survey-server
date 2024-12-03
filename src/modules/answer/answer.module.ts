import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from '../question/question.module';
import { SubmissionModule } from '../submission/submission.module';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    forwardRef(() => SubmissionModule),
    forwardRef(() => QuestionModule),
  ],
  providers: [AnswerResolver, AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
