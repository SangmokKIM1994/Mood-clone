import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./configs/typeorm.config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { AwsModule } from "./aws/aws.module";
import { MusicModule } from "./music/music.module";
import { CommentsModule } from "./comments/comments.module";
import { RecommentsModule } from "./recomments/recomments.module";
import { LikesModule } from "./likes/likes.module";
import { ScrapsModule } from "./scraps/scraps.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
    AuthModule,
    AwsModule,
    MusicModule,
    CommentsModule,
    RecommentsModule,
    LikesModule,
    ScrapsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
