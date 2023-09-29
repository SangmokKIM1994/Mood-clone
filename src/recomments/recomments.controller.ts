import {
  Controller,
  UseGuards,
  Post,
  Param,
  Req,
  Body,
  ValidationPipe,
  Patch,
  Delete,
  Query,
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

  @ApiOperation({ summary: "대댓글 조회" })
  // @ApiBody({ type: CreateRecommentDto })
  @ApiResponse({ status: 200, description: "대댓글 조회 완료" })
  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  async findRecommentByCommentId(
    @Param() commentId: number,
    @Query() page: number
  ) {
    const recomments = await this.recommentService.findRecommentByCommentId(
      commentId,
      page
    );
    return recomments;
  }

  @ApiOperation({ summary: "대댓글 수정" })
  // @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 200, description: "대댓글 수정 완료" })
  @UseGuards(AuthGuard("jwt"))
  @Patch(":recommentId")
  async updateComment(
    @Param() recommentId: number,
    @Req() req: ExpressRequest & { user: Users },
    @Body(ValidationPipe) updateRecomment: string
  ) {
    const user = req.user;
    await this.recommentService.updateRecomment({
      recommentId,
      updateRecomment,
      user,
    });
    return;
  }

  @ApiOperation({ summary: "대댓글 삭제" })
  // @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 200, description: "대댓글 삭제 완료" })
  @UseGuards(AuthGuard("jwt"))
  @Delete(":recommentId")
  async deleteComment(
    @Param() recommentId: number,
    @Req() req: ExpressRequest & { user: Users }
  ) {
    await this.recommentService.deleteRecomment(req.user, recommentId);
    return;
  }
}
