import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comments } from "src/comments/comments.entity";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Recomments } from "./recomments.entity";
import { CreateRecommentDto } from "./dto/create.recomment.dto";

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
}
