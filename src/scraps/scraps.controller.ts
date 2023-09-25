import { Controller, UseGuards, Put, Param, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request as ExpressRequest } from "express";
import { ScrapsService } from "./scraps.service";
import { Users } from "src/users/users.entity";

@ApiTags("scraps")
@Controller("scraps")
export class ScrapsController {
  constructor(private readonly scrapsService: ScrapsService) {}

  @ApiOperation({ summary: "스크랩 생성, 삭제" })
  @ApiResponse({ status: 200, description: "스크랩 생성" })
  @ApiResponse({ status: 204, description: "스크랩 삭제" })
  @UseGuards(AuthGuard("jwt"))
  @Put("/:musicId")
  async createOrDeleteScrap(
    @Param() musicId: number,
    @Req() req: ExpressRequest & { user: Users }
  ) {
    const user = req.user;
    await this.scrapsService.createOrDeleteScrap(user, musicId);
    return;
  }
}
