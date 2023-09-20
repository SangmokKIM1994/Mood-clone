import { Module } from '@nestjs/common';
import { RecommentsController } from './recomments.controller';
import { RecommentsService } from './recomments.service';

@Module({
  controllers: [RecommentsController],
  providers: [RecommentsService]
})
export class RecommentsModule {}
