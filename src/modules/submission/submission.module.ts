import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from '../answer/answer.module';
import { SurveyModule } from '../survey/survey.module';
import { Submission } from './entities/submission.entity';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    SurveyModule,
    forwardRef(() => AnswerModule),
  ],
  providers: [SubmissionResolver, SubmissionService],
  exports: [SubmissionService],
})
export class SubmissionModule {}
