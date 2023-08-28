import { Module } from "@nestjs/common";
import { S3Service } from "./s3.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 환경 변수 사용 설정
    }),
  ],
  providers: [S3Service],
})
export class AwsModule {}
