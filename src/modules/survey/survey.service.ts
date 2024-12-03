import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionService } from '../question/question.service';
import { User } from '../user/entities/user.entity';
import { CreateSurveyInput } from './dto/create-survey.input';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    private readonly questionService: QuestionService,
  ) {}

  async create(user: User, createSurveyInput: CreateSurveyInput) {
    const survey = this.surveyRepository.create(createSurveyInput);
    survey.user = user;
    survey.questions = await this.questionService.createAll(
      survey,
      createSurveyInput.questions,
    );
    await this.surveyRepository.save(survey);
    return survey;
  }

  async findAll(user: User) {
    const surveys = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.questions', 'question')
      .leftJoinAndSelect('question.options', 'option')
      .where('survey.userId = :userId', { userId: user.id })
      .getMany();
    return surveys;
  }

  async findOne(id: string) {
    const survey = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.questions', 'question')
      .leftJoinAndSelect('question.options', 'option')
      .leftJoinAndSelect('question.answers', 'answer')
      .where('survey.id = :id', { id })
      .orderBy('question.displayOrder')
      .addOrderBy('option.displayOrder')
      .getOne();
    return survey;
  }
}
