import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MusicService } from "./music.service";
import { Users } from "src/users/users.entity";
import { Request as ExpressRequest } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller("music")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @ApiOperation({ summary: "음악 조회" })
  @ApiResponse({ status: 200, description: "음악 조회 완료" })
  @UseGuards(AuthGuard("jwt"))
  @Get("/:musicId")
  async findMusicByMusicId(
    @Param() musicId: number,
    @Req() req: ExpressRequest & { user: Users }
  ) {
    const user = req.user;
    const music = await this.musicService.findMusicByMusicId(musicId, user);
    return music;
  }
}
