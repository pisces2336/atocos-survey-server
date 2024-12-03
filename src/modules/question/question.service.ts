import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OptionService } from '../option/option.service';
import { Survey } from '../survey/entities/survey.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly optionService: OptionService,
  ) {}

  async create(survey: Survey, createQuestionInput: CreateQuestionInput) {
    const question = this.questionRepository.create(createQuestionInput);
    question.survey = survey;
    question.options = await this.optionService.createAll(
      question,
      createQuestionInput.options,
    );
    await this.questionRepository.save(question);
    return question;
  }

  async createAll(survey: Survey, createQuestionInputs: CreateQuestionInput[]) {
    const result: Question[] = [];
    for (const input of createQuestionInputs) {
      const question = await this.create(survey, input);
      result.push(question);
    }
    return result;
  }

  async findOne(id: string) {
    const question = await this.questionRepository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.survey', 'survey')
      .leftJoinAndSelect('question.options', 'option')
      .leftJoinAndSelect('question.answers', 'answer')
      .where({ id })
      .getOne();
    return question;
  }
}
