import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { UserInfos } from "./userInfos.entity";
import { S3Service } from "src/aws/s3.service";
import { Likes } from "src/likes/likes.entity";
import { Scraps } from "src/scraps/scraps.entity";
import { Comments } from "src/comments/comments.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserInfos, Likes, Scraps, Comments])],
  controllers: [UsersController],
  providers: [UsersService, S3Service],
})
export class UsersModule {}
