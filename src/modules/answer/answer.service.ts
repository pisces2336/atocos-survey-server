import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionService } from '../question/question.service';
import { SubmissionService } from '../submission/submission.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,

    @Inject(forwardRef(() => SubmissionService))
    private readonly submissionService: SubmissionService,

    @Inject(forwardRef(() => QuestionService))
    private readonly questionService: QuestionService,
  ) {}

  async create(createAnswerInput: CreateAnswerInput) {
    const answer = this.answerRepository.create(createAnswerInput);
    answer.submission = await this.submissionService.findOne(
      createAnswerInput.submissionId,
    );
    answer.question = await this.questionService.findOne(
      createAnswerInput.questionId,
    );
    await this.answerRepository.save(answer);
    return answer;
  }

  async createAll(createAnswerInputs: CreateAnswerInput[]) {
    const result: Answer[] = [];
    for (const input of createAnswerInputs) {
      const answer = await this.create(input);
      result.push(answer);
    }
    return result;
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerInput: UpdateAnswerInput) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
