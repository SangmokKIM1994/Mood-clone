import { Module } from "@nestjs/common";
import { ScrapsController } from "./scraps.controller";
import { ScrapsService } from "./scraps.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/users.entity";
import { Musics } from "src/music/music.entity";
import { Scraps } from "./scraps.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Musics, Scraps])],
  controllers: [ScrapsController],
  providers: [ScrapsService],
})
export class ScrapsModule {}
