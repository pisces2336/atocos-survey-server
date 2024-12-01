import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/modules/question/entities/question.entity';
import { Submission } from 'src/modules/submission/entities/submission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Answer {
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
  @ManyToOne(() => Submission, (submission) => submission.answers)
  submission: Submission;

  @Field()
  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @Field()
  @Column()
  answerText: string;
}
