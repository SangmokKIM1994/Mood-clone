import { ApiResponseProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CheckIdDto {
  @ApiResponseProperty({ example: "yeong0319" })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  id: string;
}
