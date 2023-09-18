import {
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Req,
  Body,
  Param,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create.comments.dto";
import { Request as ExpressRequest } from "express";
import { Users } from "src/users/users.entity";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("comments")
@Controller("comments")
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @ApiOperation({ summary: "댓글 생성" })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: "댓글 생성 완료" })
  @UseGuards(AuthGuard("jwt"))
  @Post("/")
  async createCommnet(
    @Param() musicId: number,
    @Req() req: ExpressRequest & { user: Users },
    @Body(ValidationPipe) createCommentDto: CreateCommentDto
  ) {
    const { comment } = createCommentDto;
    const user = req.user;
    await this.commentService.createCommnet({ user, musicId, comment });
  }
}
