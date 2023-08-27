import { ApiResponseProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiResponseProperty({ example: "yeong0319" })
  @IsString()
  id: string;

  @ApiResponseProperty({ example: "tkdahr$56" })
  @IsString()
  password: string;
}
