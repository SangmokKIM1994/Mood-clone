import { Module } from "@nestjs/common";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";
import { Likes } from "./likes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Musics, Users, Likes])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
