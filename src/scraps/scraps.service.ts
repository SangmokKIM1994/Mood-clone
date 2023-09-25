import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Scraps } from "./scraps.entity";
import { Repository } from "typeorm";
import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";

@Injectable()
export class ScrapsService {
  constructor(
    @InjectRepository(Scraps)
    private readonly scrapRepository: Repository<Scraps>,
    @InjectRepository(Musics)
    private readonly musicRepository: Repository<Musics>
  ) {}

  async createOrDeleteScrap(user: Users, musicId: number) {
    try {
      const music = await this.musicRepository.findOne({ where: { musicId } });
      if (!music) {
        throw new NotFoundException("음악을 찾을 수 없습니다.");
      }
      const scrap = await this.scrapRepository.findOne({
        where: {
          user: { userId: user.userId },
          music: { musicId: music.musicId },
        },
      });
      if (!scrap) {
        const createScrap = this.scrapRepository.create({ user, music });
        await this.scrapRepository.save(createScrap);
      } else {
        await this.scrapRepository.delete({ scrapId: scrap.scrapId });
      }
      return;
    } catch (error) {
      throw new InternalServerErrorException("스크랩 생성, 삭제 시 서버 에러");
    }
  }
}
