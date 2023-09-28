import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { MusicService } from "./music.service";

@Controller("music")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @ApiOperation({ summary: "음악 조회" })
  @ApiResponse({ status: 200, description: "음악 조회 완료" })
  @Get("/:musicId")
  async findMusicByMusicId(@Param() musicId: number) {
    const music = await this.musicService.findMusicByMusicId(musicId);
    return music;
  }
}
