import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Musics } from "./music.entity";
import { Streamings } from "src/streamings/streamings.entity";
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Musics)
    private readonly musicRepository: Repository<Musics>,
    @InjectRepository(Streamings)
    private readonly streamingRepository: Repository<Streamings>,
    private readonly elasticsearchService: ElasticsearchService
  ) {}

  mood = async ({ userId, x, y }) => {
    let message: string;
    if (x >= 0 && x <= 25 && y >= 0 && y <= 25) {
      if (x == 25 && y == 25) {
        message = "당신은 조금의 불만족을 느끼는 것 같아요.";
      } else if (x == 25 && y == 0) {
        message = "당신은 조금 우울해 보입니다..";
      } else if (x == 0 && y == 25) {
        message = "당신은 우울해 보입니다.";
      }
      message = "당신은 약간 우울해 보입니다.";
    } else if (x > 25 && x <= 50 && y >= 0 && y <= 25) {
      if (x == 50 && y == 25) {
        message = "당신은 조금 불만족을 느끼는 것 같아요.";
      } else if (x == 50 && y == 0) {
        message = "당신은 불만족을 느끼는 것 같아요.";
      }
      message = "당신은 약간의 불만족을 느끼는 것 같아요.";
    } else if (x > 50 && x <= 75 && y >= 0 && y <= 25) {
      if (x == 75 && y == 25) {
        message = "당신은 조금의 만족감을 느끼는 것 같아요.";
      } else if (x == 75 && y == 0) {
        message = "당신은 만족감을 느끼는 것 같아요.";
      }
      message = "당신은 약간의 만족감을 느끼는 것 같아요.";
    } else if (x > 75 && x <= 100 && y >= 0 && y <= 25) {
      if (x == 100 && y == 25) {
        message = "당신은 기분이 좋아 보입니다.";
      }
      message = "당신은 약간 기분이 좋아 보입니다.";
    } else if (x >= 0 && x <= 25 && y > 25 && y <= 50) {
      if (x == 0 && y == 50) {
        message = "당신은 조금 불안해하는 모습이네요.";
      } else if (x == 25 && y == 50) {
        message = "당신은 불안해하는 모습이네요.";
      }
      message = "당신은 상당히 불안해하는 모습이네요.";
    } else if (x > 25 && x <= 50 && y > 25 && y <= 50) {
      if (x == 50 && y == 50) {
        message = "당신은 불편해 보입니다.";
      }
      message = "당신은 조금 불편해 보입니다.";
    } else if (x > 50 && x <= 75 && y > 25 && y <= 50) {
      if (x == 75 && y == 50) {
        message = "당신은 편안해 보입니다..";
      }
      message = "당신은 조금 편안해 보입니다.";
    } else if (x > 75 && x <= 100 && y > 25 && y <= 50) {
      if (x == 100 && y == 50) {
        message = "당신은 만족해하는 모습이네요.";
      }
      message = "당신은 상당히 만족해하는 모습이네요.";
    } else if (x >= 0 && x <= 25 && y > 50 && y <= 75) {
      if (x == 0 && y == 75) {
        message = "당신은 화가 나 보입니다.";
      } else if (x == 25 && y == 75) {
        message = "당신은 분노를 느끼고 계시네요.";
      }
      message = "당신은 정말 화가 나 보입니다.";
    } else if (x > 25 && x <= 50 && y > 50 && y <= 75) {
      if (x == 50 && y == 75) {
        message = "당신은 조금 편안해 보입니다.";
      }
      message = "당신은 조금 불편해 보입니다.";
    } else if (x > 50 && x <= 75 && y > 50 && y <= 75) {
      if (x == 75 && y == 75) {
        message = "당신은 정말 행복해 보입니다.";
      }
      message = "당신은 기쁜 모습이네요.";
    } else if (x > 75 && x <= 100 && y > 50 && y <= 75) {
      if (x == 100 && y == 75) {
        message = "당신은 행복해 보입니다.";
      }
      message = "당신은 정말 행복해 보입니다.";
    } else if (x >= 0 && x <= 25 && y > 75 && y <= 100) {
      if (x == 25 && y == 100) {
        message = "당신은 정말 화가 나 보입니다.";
      }
      message = "당신은 엄청난 분노를 느끼고 계시네요.";
    } else if (x > 25 && x <= 50 && y > 75 && y <= 100) {
      if (x == 50 && y == 100) {
        message = "당신은 상당히 화가 난 것 같아요.";
      }
      message = "당신은 굉장히 화가 나 보입니다.";
    } else if (x > 50 && x <= 75 && y > 75 && y <= 100) {
      if (x == 75 && y == 100) {
        message = "당신은 정말 행복해 보입니다.";
      }
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
  };

  async findMusicByMusicId(musicId: number, user: Users) {
    const music = await this.musicRepository.findOne({ where: { musicId } });
    const streaming = this.streamingRepository.create({ user, music });
    await this.streamingRepository.save(streaming);
    return;
  }

  async searchMusic(keyword: string) {
    const result = await this.elasticsearchService.search({
      index: "music",
      body: {
        query: {
          match: { title: keyword },
        },
      },
    });

    return result;
  }
}
