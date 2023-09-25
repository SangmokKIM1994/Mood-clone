import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Likes } from "./likes.entity";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly likeRepository: Repository<Likes>,
    @InjectRepository(Musics)
    private readonly musicRepository: Repository<Musics>
  ) {}

  async createOrDeleteLike(user: Users, musicId: number) {
    try {
      const music = await this.musicRepository.findOne({ where: { musicId } });
      if (!music) {
        throw new NotFoundException("음악을 찾을 수 없습니다.");
      }
      const like = await this.likeRepository.findOne({
        where: {
          user: { userId: user.userId },
          music: { musicId: music.musicId },
        },
      });
      if (!like) {
        const createLike = this.likeRepository.create({ user, music });
        await this.likeRepository.save(createLike);
      } else {
        await this.likeRepository.delete({ likeId: like.likeId });
      }
      return;
    } catch (error) {
      throw new InternalServerErrorException("좋아요 생성, 삭제 시 서버 에러");
    }
  }
}
