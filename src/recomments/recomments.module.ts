import { Module } from '@nestjs/common';
import { RecommentsController } from './recomments.controller';
import { RecommentsService } from './recomments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Recomments } from './recomments.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users, Recomments])],
  controllers: [RecommentsController],
  providers: [RecommentsService]
})
export class RecommentsModule {}
