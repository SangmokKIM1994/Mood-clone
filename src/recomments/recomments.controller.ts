import {
  Controller,
  UseGuards,
  Post,
  Param,
  Req,
  Body,
  ValidationPipe,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RecommentsService } from "./recomments.service";
import { CreateRecommentDto } from "./dto/create.recomment.dto";
import { AuthGuard } from "@nestjs/passport";
import { Users } from "src/users/users.entity";
import { Request as ExpressRequest } from "express";

@ApiTags("recomments")
@Controller("recomments")
export class RecommentsController {
  constructor(private readonly recommentService: RecommentsService) {}

  @ApiOperation({ summary: "대댓글 생성" })
  @ApiBody({ type: CreateRecommentDto })
  @ApiResponse({ status: 201, description: "댓글 생성 완료" })
  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  async createCommnet(
    @Param() commentId: number,
    @Req() req: ExpressRequest & { user: Users },
    @Body(ValidationPipe) createReommentDto: CreateRecommentDto
  ) {
    const { recomment } = createReommentDto;
    const user = req.user;
    await this.recommentService.createRecomment({ user, commentId, recomment });
  }
}
