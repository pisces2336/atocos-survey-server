import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from '../question/question.module';
import { Survey } from './entities/survey.entity';
import { SurveyResolver } from './survey.resolver';
import { SurveyService } from './survey.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey]), QuestionModule],
  providers: [SurveyResolver, SurveyService],
})
export class SurveyModule {}
