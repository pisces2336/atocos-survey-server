import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerService } from '../answer/answer.service';
import { SurveyService } from '../survey/survey.service';
import { CreateSubmissionInput } from './dto/create-submission.input';
import { Submission } from './entities/submission.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,

    private readonly surveyService: SurveyService,

    @Inject(forwardRef(() => AnswerService))
    private readonly answerService: AnswerService,
  ) {}

  async create(createSubmissionInput: CreateSubmissionInput) {
    // 同一IPアドレスからの回答は拒否する
    const submissionExists = await this.getAlreadySubmitted(
      createSubmissionInput.surveyId,
      createSubmissionInput.ipAddress,
    );
    if (submissionExists) {
      throw new BadRequestException('同一IPアドレスからの回答が存在します。');
    }

    const submission = this.submissionRepository.create(createSubmissionInput);
    submission.survey = await this.surveyService.findOne(
      createSubmissionInput.surveyId,
    );
    submission.answers = await this.answerService.createAll(
      createSubmissionInput.answers.map((answerInput) => {
        answerInput.submissionId = submission.id;
        return answerInput;
      }),
    );
    await this.submissionRepository.save(submission);
    return submission;
  }

  async findOne(id: string) {
    const submission = await this.submissionRepository
      .createQueryBuilder('submission')
      .leftJoinAndSelect('submission.survey', 'survey')
      .leftJoinAndSelect('submission.answers', 'answer')
      .where({ id })
      .getOne();
    return submission;
  }

  async getAlreadySubmitted(surveyId: string, ipAddress: string) {
    const exists = await this.submissionRepository
      .createQueryBuilder('submission')
      .leftJoin('submission.survey', 'survey')
      .where('survey.id = :surveyId', { surveyId })
      .andWhere('ipAddress = :ipAddress', { ipAddress })
      .getExists();
    return exists;
  }
}
