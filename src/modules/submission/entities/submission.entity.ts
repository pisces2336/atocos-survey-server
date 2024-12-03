import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { Survey } from 'src/modules/survey/entities/survey.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Submission {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @ManyToOne(() => Survey, (survey) => survey.submissions)
  survey: Survey;

  @Field()
  @Column()
  ipAddress: string;

  @Field()
  @OneToMany(() => Answer, (answer) => answer.submission)
  answers: Answer[];
}
