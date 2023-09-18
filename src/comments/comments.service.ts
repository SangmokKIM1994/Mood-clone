import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Comments } from "./comments.entity";
import { CreateCommentDto } from "./dto/create.comments.dto";
import { TransformationType } from "class-transformer";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
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
}
