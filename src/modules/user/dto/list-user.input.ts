import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListUserInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  email: string;
}
