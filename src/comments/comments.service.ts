import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Comments } from "./comments.entity";
import { CreateCommentDto } from "./dto/create.comments.dto";
import { UpdateCommentDto } from "./dto/update.comments.dto";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Musics)
    private readonly musicRepository: Repository<Musics>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>
  ) {}

  async createCommnet(createCommentDto: CreateCommentDto) {
    try {
      const { user, musicId, comment } = createCommentDto;
      const music = await this.musicRepository.findOne({ where: { musicId } });
      const result = this.commentRepository.create({
        comment,
        user,
        music,
      });
      await this.commentRepository.save(result);
      return;
    } catch (error) {
      throw new InternalServerErrorException("댓글 생성 시 서버 에러");
    }
  }

  async findByMusicId(musicId: number, page: number) {
    try {
      const perPage = 10;
      const offset = (page - 1) * perPage;

      const commentsQuery = this.commentRepository
        .createQueryBuilder("comment")
        .leftJoin("comment.recomments", "recomment")
        .select([
          "comment.commentId",
          "comment.comment",
          "COUNT(recomment.commentId) AS recommentCount",
        ])
        .where("comment.musicId = :musicId", { musicId })
        .groupBy("comment.id")
        .skip(offset)
        .take(perPage);

      const comments = await commentsQuery.getRawMany();

      const totalCommentsQuery = commentsQuery.groupBy(undefined);
      const totalCommentsResult = await totalCommentsQuery.getCount();

      return { comments, total: totalCommentsResult };
    } catch (error) {
      throw new InternalServerErrorException("댓글 조회 시 서버 에러");
    }
  }

  async updateComment(updateCommentDto: UpdateCommentDto) {
    try {
      const { commentId, updateComment, user } = updateCommentDto;
      const comment = await this.commentRepository.findOne({
        where: { commentId },
      });

      if (user.userId !== comment.user.userId) {
        throw new NotFoundException("회원 정보가 일치하지 않습니다.");
      }
      if (updateComment === comment.comment) {
        throw new NotFoundException("내용이 일치 합니다.");
      }
      comment.comment = updateComment;
      await this.commentRepository.save(comment);
      return;
    } catch (error) {
      throw new InternalServerErrorException("댓글 수정 시 서버 에러");
    }
  }

  async deleteComment(user: Users, commentId: number) {
    try {
      const comment = await this.commentRepository.findOne({
        where: { commentId },
      });
      if (user.userId !== comment.user.userId) {
        throw new NotFoundException("회원 정보가 일치하지 않습니다.");
      }
      await this.commentRepository.delete({ commentId });
      return;
    } catch (error) {
      throw new InternalServerErrorException("댓글 삭제 시 서버 에러");
    }
  }
}
