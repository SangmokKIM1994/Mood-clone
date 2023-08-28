import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import * as AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UploadMiddleware implements NestMiddleware {
  private s3 = new AWS.S3();

  // multer 설정
  private upload = multer({
    storage: multer.memoryStorage(), // 메모리에 임시 저장
    limits: {
      fileSize: 5 * 1024 * 1024, // 최대 파일 크기 (5MB)
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("이미지 파일 형식만 업로드 가능합니다."), false);
      }
    },
  });

  use(req: Request, res: Response, next: NextFunction) {
    // 'upload' 미들웨어 사용하여 파일 업로드 처리
    this.upload.array("files")(req, res, (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        // S3 업로드 처리
        const files: multer.File[] = req.files[0] as multer.File[];
        const uploadedFileUrls: string[] = [];

        for (const file of files) {
          const uploadParams: AWS.S3.PutObjectRequest = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${uuidv4()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
          };

          this.s3.upload(uploadParams, (err, data) => {
            if (err) {
              console.error("S3 업로드 실패:", err);
            } else {
              uploadedFileUrls.push(data.Location);
              if (uploadedFileUrls.length === files.length) {
                // 모든 파일 업로드 완료 시, 업로드된 파일 URL을 요청 객체에 추가
                req["uploadedFileUrls"] = uploadedFileUrls;
                next();
              }
            }
          });
        }
      }
    });
  }
}
