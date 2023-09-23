import { ApiResponseProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Users } from "src/users/users.entity";

export class UpdateRecommentDto {
  @ApiResponseProperty({ example: "1" })
  @IsNumber()
  recommentId: number;

  @ApiResponseProperty({ example: "1" })
  user: Users;

  @ApiResponseProperty({ example: "노래가 너무 좋아요." })
  @IsString()
  updateRecomment: string;
}
