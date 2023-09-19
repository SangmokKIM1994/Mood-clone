import {
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Req,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create.comments.dto";
import { Request as ExpressRequest } from "express";
import { Users } from "src/users/users.entity";
import { AuthGuard } from "@nestjs/passport";
import { string0To255 } from "aws-sdk/clients/customerprofiles";

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

  @ApiOperation({ summary: "댓글 생성" })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: "댓글 생성 완료" })
  @UseGuards(AuthGuard("jwt"))
  @Patch(":commentId")
  async updateComment(
    @Param() commentId: number,
    @Req() req: ExpressRequest & { user: Users },
    @Body(ValidationPipe) updateComment: string
  ) {
    const user = req.user;
    await this.commentService.updateComment({ commentId, updateComment, user });
    return;
  }

  @ApiOperation({ summary: "댓글 생성" })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: "댓글 생성 완료" })
  @UseGuards(AuthGuard("jwt"))
  @Delete(":commentId")
  async deleteComment(
    @Param() commentId: number,
    @Req() req: ExpressRequest & { user: Users }
  ) {
    await this.commentService.deleteComment(req.user, commentId);
    return;
  }
}
