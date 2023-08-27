import { ApiResponseProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteUserDto {
  @ApiResponseProperty({ example: "1" })
  @IsNumber()
  userId: number;
}
