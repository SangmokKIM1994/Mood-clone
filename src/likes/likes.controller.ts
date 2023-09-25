import { Controller, UseGuards, Put, Param, Req } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Request as ExpressRequest } from "express";
import { Users } from "src/users/users.entity";

@ApiTags("likes")
@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: "좋아요 생성, 삭제" })
  @ApiResponse({ status: 200, description: "좋아요 생성" })
  @ApiResponse({ status: 204, description: "좋아요 삭제" })
  @UseGuards(AuthGuard("jwt"))
  @Put("/:musicId")
  async createOrDeleteLike(
    @Param() musicId: number,
    @Req() req: ExpressRequest & { user: Users }
  ) {
    const user = req.user;
    await this.likesService.createOrDeleteLike(user, musicId);
    return;
  }
}
