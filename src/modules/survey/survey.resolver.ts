import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';
import { Survey } from './entities/survey.entity';
import { SurveyService } from './survey.service';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Mutation(() => Survey)
  @UseGuards(JwtAuthGuard)
  createSurvey(
    @Args('createSurveyInput') createSurveyInput: CreateSurveyInput,
    @Context() context,
  ) {
    const user = context.req.user;
    return this.surveyService.create(user, createSurveyInput);
  }

  @Query(() => [Survey])
  @UseGuards(JwtAuthGuard)
  listSurvey(@Context() context) {
    const user = context.req.user;
    return this.surveyService.findAll(user);
  }

  @Query(() => Survey)
  getSurvey(@Args('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Mutation(() => Survey)
  updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ) {
    // return this.surveyService.update(updateSurveyInput.id, updateSurveyInput);
  }

  @Mutation(() => Survey)
  removeSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.surveyService.remove(id);
  }
}
