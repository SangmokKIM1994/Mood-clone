import { IsNumber, IsString } from "class-validator";
import { Users } from "src/users/users.entity";

export class CreateRecommentDto {
  @IsNumber()
  commentId: number;

  user: Users;

  @IsString()
  recomment: string;
}
