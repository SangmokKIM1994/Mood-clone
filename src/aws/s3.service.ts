import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      // AWS 계정의 액세스 키와 비밀 키 설정
      accessKeyId: configService.get("ACCESS_KEY"),
      secretAccessKey: configService.get("SECRET_ACCESS_KEY"),
    });
  }

  async uploadFileToS3(
    fileBuffer: Buffer,
    originalFilename: string
  ): Promise<string> {
    const bucketName = this.configService.get("BUCKET_NAME");
    const key = `${uuidv4()}-${originalFilename}`;

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: fileBuffer,
    };

    const result = await this.s3.upload(params).promise();
    return result.Location;
  }
}
