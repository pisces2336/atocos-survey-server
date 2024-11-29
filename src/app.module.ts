import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import gqlconfig from 'gqlconfig';
import ormconfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), GraphQLModule.forRoot(gqlconfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
