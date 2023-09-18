import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/users.entity";
import { Musics } from "src/music/music.entity";
import { Comments } from "./comments.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Musics, Comments])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
