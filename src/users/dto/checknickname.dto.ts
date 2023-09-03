import { ApiResponseProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CheckNicknameDto {
  @ApiResponseProperty({ example: "Mozz" })
  @IsString()
  @MinLength(2)
  @MaxLength(8)
  nickname: string;
}
