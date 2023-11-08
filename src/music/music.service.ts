import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Musics } from "./music.entity";
import { Streamings } from "src/streamings/streamings.entity";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Likes } from "src/likes/likes.entity";
import { Scraps } from "src/scraps/scraps.entity";
import { Comments } from "src/comments/comments.entity";

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Musics)
    private readonly musicRepository: Repository<Musics>,
    @InjectRepository(Streamings)
    private readonly streamingRepository: Repository<Streamings>,
    @InjectRepository(Likes)
    private readonly likeRepository: Repository<Likes>,
    @InjectRepository(Scraps)
    private readonly scrapRepository: Repository<Scraps>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  mood = async ({ userId, x, y }) => {
    try {
      let message: string;
      if (x >= 0 && x <= 25 && y >= 0 && y <= 25) {
        message = "당신은 약간 우울해 보입니다.";
      } else if (x > 25 && x <= 50 && y >= 0 && y <= 25) {
        message = "당신은 약간의 불만족을 느끼는 것 같아요.";
      } else if (x > 50 && x <= 75 && y >= 0 && y <= 25) {
        message = "당신은 약간의 만족감을 느끼는 것 같아요.";
      } else if (x > 75 && x <= 100 && y >= 0 && y <= 25) {
        message = "당신은 약간 기분이 좋아 보입니다.";
      } else if (x >= 0 && x <= 25 && y > 25 && y <= 50) {
        message = "당신은 상당히 불안해하는 모습이네요.";
      } else if (x > 25 && x <= 50 && y > 25 && y <= 50) {
        message = "당신은 조금 불편해 보입니다.";
      } else if (x > 50 && x <= 75 && y > 25 && y <= 50) {
        message = "당신은 조금 편안해 보입니다.";
      } else if (x > 75 && x <= 100 && y > 25 && y <= 50) {
        message = "당신은 상당히 만족해하는 모습이네요.";
      } else if (x >= 0 && x <= 25 && y > 50 && y <= 75) {
        message = "당신은 정말 화가 나 보입니다.";
      } else if (x > 25 && x <= 50 && y > 50 && y <= 75) {
        message = "당신은 조금 불편해 보입니다.";
      } else if (x > 50 && x <= 75 && y > 50 && y <= 75) {
        message = "당신은 기쁜 모습이네요.";
      } else if (x > 75 && x <= 100 && y > 50 && y <= 75) {
        message = "당신은 정말 행복해 보입니다.";
      } else if (x >= 0 && x <= 25 && y > 75 && y <= 100) {
        message = "당신은 엄청난 분노를 느끼고 계시네요.";
      } else if (x > 25 && x <= 50 && y > 75 && y <= 100) {
        message = "당신은 굉장히 화가 나 보입니다.";
      } else if (x > 50 && x <= 75 && y > 75 && y <= 100) {
        message = "당신은 굉장히 기뻐하는 것 같아요.";
      } else if (x > 75 && x <= 100 && y > 75 && y <= 100) {
        message = "당신은 기쁨을 느끼고 계시네요!";
      }
      if (!userId) {
        // const musicData = await this.musicRepository.find({where:{status}});
        // return { musicData, message };
      } else {
        // const musicData = await this.musicRepository.findOneByStatus(status);
        const date = `${new Date().getMonth() + 1}월${new Date().getDate()}일 `;
        const newMassage = `${date}` + message;
        const user = await this.userRepository.findOne({ where: { userId } });
        user.userInfo.myStatus = newMassage;
        await this.userRepository.save(user);
        // return { musicData, message };
      }
    } catch (error) {
      throw new InternalServerErrorException(
        "xy좌표를 이용한 음악 추천 중 서버 에러"
      );
    }
  };

  async findMusicByMusicId(musicId: number, user: Users) {
    try {
      const music = await this.musicRepository.findOne({ where: { musicId } });
      const streaming = this.streamingRepository.create({ user, music });
      await this.streamingRepository.save(streaming);
      return music;
    } catch (error) {
      throw new InternalServerErrorException(
        "musicId로 음악 조회 중 서버 에러"
      );
    }
  }

  async searchMusic(keyword: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: "music",
        body: {
          query: {
            match: { title: keyword },
          },
        },
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException("음악 검색 중 서버 에러");
    }
  }

  async suggestMusic(userId: number) {
    try {
      const randomNumber = Math.floor(Math.random() * 4) + 1;

      if (randomNumber === 1) {
        const findRecentLike = await this.likeRepository.findOne({
          where: { userId },
          order: { likeId: "DESC" },
        });
        const topLikeMusic = await this.likeRepository
          .createQueryBuilder("like")
          .innerJoin("like.music", "music")
          .innerJoin("like.status", "status")
          .select([
            "music.musicId as musicId",
            "music.title as title",
            "COUNT(like.id) as likeCount",
          ])
          .where("status.statusId = :statusId", {
            statusId: findRecentLike.status.statusId,
          })
          .groupBy("music.id")
          .orderBy("likeCount", "DESC")
          .limit(5)
          .getRawMany();

        return { data: topLikeMusic };
      } else if (randomNumber === 2) {
        const findRecentStreaming = await this.streamingRepository.findOne({
          where: { userId },
          order: { streamingId: "DESC" },
        });

        const topStreamingMusic = await this.streamingRepository
          .createQueryBuilder("streaming")
          .innerJoin("streaming.music", "music")
          .innerJoin("streaming.status", "status")
          .select([
            "music.id as musicId",
            "music.title as title",
            "COUNT(streaming.id) as playCount",
          ])
          .where("status.statusId = :statusId", {
            statusId: findRecentStreaming.status,
          })
          .groupBy("music.id")
          .orderBy("playCount", "DESC")
          .limit(5)
          .getRawMany();
        return { data: topStreamingMusic };
      } else if (randomNumber === 3) {
        const findRecentComment = await this.commentRepository.findOne({
          where: { userId },
          order: { commentId: "DESC" },
        });

        const topCommentMusic = await this.commentRepository
          .createQueryBuilder("comment")
          .innerJoin("comment.music", "music")
          .innerJoin("comment.status", "status")
          .select([
            "music.musicId as musicId",
            "music.title as title",
            "COUNT(comment.id) as commentCount",
          ])
          .where("status.statusId = :statusId", {
            statusId: findRecentComment.status,
          })
          .groupBy("music.id")
          .orderBy("commentCount", "DESC")
          .limit(5)
          .getRawMany();
        return { data: topCommentMusic };
      } else if (randomNumber === 4) {
        const findRecentScrap = await this.scrapRepository.findOne({
          where: { userId },
          order: { scrapId: "DESC" },
        });

        const scrapMusic = await this.musicRepository.findOne({
          where: { musicId: findRecentScrap.musicId },
          relations: ["composer"],
        });

        const scrapComposerMusic = await this.musicRepository
          .createQueryBuilder("music")
          .innerJoin("music.composer", "composer")
          .select([
            "music.musicId as musicId",
            "music.title as title",
            "composer.name as composerName",
          ])
          .where("composer.composerId = :composerId", {
            composerdId: scrapMusic.composer.composerId,
          })
          .orderBy("music.musicId", "DESC")
          .limit(5)
          .getMany();
        return { data: scrapComposerMusic };
      }
    } catch (error) {
      throw new InternalServerErrorException("맞춤 음악 추천 중 서버 에러");
    }
  }
}
