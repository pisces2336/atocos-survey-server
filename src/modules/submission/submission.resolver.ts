import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubmissionInput } from './dto/create-submission.input';
import { UpdateSubmissionInput } from './dto/update-submission.input';
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

  @Query(() => [Submission], { name: 'submission' })
  findAll() {
    return this.submissionService.findAll();
  }

  @Query(() => Submission, { name: 'submission' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    // return this.submissionService.findOne(id);
  }

  @Query(() => Boolean)
  alreadySubmitted(@Args('ipAddress') ipAddress: string) {
    return this.submissionService.getExistsByIpAddress(ipAddress);
  }

  @Mutation(() => Submission)
  updateSubmission(
    @Args('updateSubmissionInput') updateSubmissionInput: UpdateSubmissionInput,
  ) {
    return this.submissionService.update(
      updateSubmissionInput.id,
      updateSubmissionInput,
    );
  }

  @Mutation(() => Submission)
  removeSubmission(@Args('id', { type: () => Int }) id: number) {
    return this.submissionService.remove(id);
  }
}
