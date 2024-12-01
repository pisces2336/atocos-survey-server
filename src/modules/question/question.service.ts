import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OptionService } from '../option/option.service';
import { Survey } from '../survey/entities/survey.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
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

  findAll() {
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionInput: UpdateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
