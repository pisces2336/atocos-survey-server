import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class LoginUserResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
