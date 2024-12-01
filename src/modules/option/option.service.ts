import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../question/entities/question.entity';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async create(question: Question, createOptionInput: CreateOptionInput) {
    const option = this.optionRepository.create(createOptionInput);
    option.question = question;
    await this.optionRepository.save(option);
    return option;
  }

  async createAll(question: Question, createOptionInputs: CreateOptionInput[]) {
    const result: Option[] = [];
    for (const input of createOptionInputs) {
      const option = await this.create(question, input);
      result.push(option);
    }
    return result;
  }

  findAll() {
    return `This action returns all option`;
  }

  findOne(id: number) {
    return `This action returns a #${id} option`;
  }

  update(id: number, updateOptionInput: UpdateOptionInput) {
    return `This action updates a #${id} option`;
  }

  remove(id: number) {
    return `This action removes a #${id} option`;
  }
}
