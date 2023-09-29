import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "src/comments/comments.entity";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Recomments } from "./recomments.entity";
import { CreateRecommentDto } from "./dto/create.recomment.dto";
import { UpdateRecommentDto } from "./dto/update.recomment.dto";

@Injectable()
export class RecommentsService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    @InjectRepository(Recomments)
    private readonly recommentRepository: Repository<Recomments>
  ) {}

  async createRecomment(createRecommentDto: CreateRecommentDto) {
    try {
      const { user, commentId, recomment } = createRecommentDto;
      const comment = await this.commentRepository.findOne({
        where: { commentId },
      });
      const result = this.recommentRepository.create({
        user,
        comment,
        recomment,
      });
      await this.recommentRepository.save(result);
      return;
    } catch (error) {
      throw new InternalServerErrorException("대댓글 생성 시 서버 에러");
    }
  }

  async findRecommentByCommentId(commentId: number, page: number) {
    try {
      const perPage = 10;
      const offset = (page - 1) * perPage;
      const recomments = await this.recommentRepository.find({
        where: { comment: { commentId } },
        skip: offset,
        take: perPage,
      });

      const totalRecomments = await this.recommentRepository.count({
        where: { comment: { commentId } },
      });
      const totalPages = Math.ceil(totalRecomments / perPage);

      if (recomments.length === 0) {
        throw new NotFoundException("대댓글을 찾을 수 없습니다.");
      }
      return { recomments, totalPages };
    } catch (error) {
      throw new InternalServerErrorException("대댓글 조회 중 서버 에러");
    }
  }

  async updateRecomment(updateRecommentDto: UpdateRecommentDto) {
    try {
      const { recommentId, updateRecomment, user } = updateRecommentDto;
      const recomment = await this.recommentRepository.findOne({
        where: { recommentId },
      });

      if (user.userId !== recomment.user.userId) {
        throw new NotFoundException("회원 정보가 일치하지 않습니다.");
      }
      if (updateRecomment === recomment.recomment) {
        throw new NotFoundException("내용이 일치 합니다.");
      }
      recomment.recomment = updateRecomment;
      await this.recommentRepository.save(recomment);
      return;
    } catch (error) {
      throw new InternalServerErrorException("대댓글 수정 시 서버 에러");
    }
  }

  async deleteRecomment(user: Users, recommentId: number) {
    try {
      const comment = await this.recommentRepository.findOne({
        where: { recommentId },
      });
      if (user.userId !== comment.user.userId) {
        throw new NotFoundException("회원 정보가 일치하지 않습니다.");
      }
      await this.recommentRepository.delete({ recommentId });
      return;
    } catch (error) {
      throw new InternalServerErrorException("대댓글 삭제 시 서버 에러");
    }
  }
}
