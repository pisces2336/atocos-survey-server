import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import gqlconfig from 'gqlconfig';
import { ormconfig } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionModule } from './modules/question/question.module';
import { SurveyModule } from './modules/survey/survey.module';
import { UserModule } from './modules/user/user.module';
import { OptionModule } from './modules/option/option.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { AnswerModule } from './modules/answer/answer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot(gqlconfig),
    UserModule,
    AuthModule,
    SurveyModule,
    QuestionModule,
    OptionModule,
    SubmissionModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
