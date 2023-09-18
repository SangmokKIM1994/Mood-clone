import { ApiResponseProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Users } from "src/users/users.entity";

export class CreateCommentDto {
    @ApiResponseProperty({example:"1"})
    @IsNumber()
    user:Users

    @ApiResponseProperty({example:"1"})
    @IsNumber()
    musicId:number

    @ApiResponseProperty({example:"노래가 너무 좋아요."})
    @IsString()
    comment:string
}