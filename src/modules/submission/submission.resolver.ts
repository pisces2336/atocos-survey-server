import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubmissionInput } from './dto/create-submission.input';
import { Submission } from './entities/submission.entity';
import { SubmissionService } from './submission.service';

@Resolver(() => Submission)
export class SubmissionResolver {
  constructor(private readonly submissionService: SubmissionService) {}

  @Mutation(() => Submission)
  createSubmission(
    @Args('createSubmissionInput') createSubmissionInput: CreateSubmissionInput,
  ) {
    return this.submissionService.create(createSubmissionInput);
  }

  @Query(() => Boolean)
  getAlreadySubmitted(
    @Args('surveyId') surveyId: string,
    @Args('ipAddress') ipAddress: string,
  ) {
    return this.submissionService.getAlreadySubmitted(surveyId, ipAddress);
  }
}
