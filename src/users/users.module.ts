import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { UserInfos } from "./userInfos.entity";
import { S3Service } from "src/aws/s3.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users,UserInfos])],
  controllers: [UsersController],
  providers: [UsersService,S3Service],
})
export class UsersModule {}
