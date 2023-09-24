import { Module } from '@nestjs/common';
import { ScrapsController } from './scraps.controller';
import { ScrapsService } from './scraps.service';

@Module({
  controllers: [ScrapsController],
  providers: [ScrapsService]
})
export class ScrapsModule {}
