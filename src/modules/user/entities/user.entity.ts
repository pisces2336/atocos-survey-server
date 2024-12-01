import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Survey } from 'src/modules/survey/entities/survey.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
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
  @Column({ unique: true })
  email: string;

  @HideField()
  @Column()
  password: string;

  @Field()
  @OneToMany(() => Survey, (survey) => survey.user)
  surveys: Survey[];
}
