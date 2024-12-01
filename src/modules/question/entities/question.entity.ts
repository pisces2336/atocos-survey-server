import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Answer } from 'src/modules/answer/entities/answer.entity';
import { Option } from 'src/modules/option/entities/option.entity';
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
export class Question {
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
  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey;

  @Field()
  @Column()
  displayOrder: number;

  @Field(() => String)
  @Column()
  type: 'SingleSelection' | 'MultipleSelection' | 'FreeText';

  @Field()
  @Column()
  questionnaire: string;

  @Field()
  @OneToMany(() => Option, (option) => option.question)
  options: Option[];

  @Field()
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
