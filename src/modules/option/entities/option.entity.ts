import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/modules/question/entities/question.entity';
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
export class Option {
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
  @Column()
  displayOrder: number;

  @Field()
  @Column()
  label: string;

  @Field()
  @ManyToOne(() => Question, (question) => question.options)
  question: Question;
}
