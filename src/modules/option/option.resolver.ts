import { Resolver } from '@nestjs/graphql';
import { Option } from './entities/option.entity';
import { OptionService } from './option.service';

@Resolver(() => Option)
export class OptionResolver {
  constructor(private readonly optionService: OptionService) {}
}
