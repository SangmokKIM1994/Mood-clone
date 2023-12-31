import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { SignUpDto } from "./dto/signup.dto";
import { UserInfos } from "./userInfos.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { S3Service } from "src/aws/s3.service";
import { CheckIdDto } from "./dto/checkid.dto";
import { CheckNicknameDto } from "./dto/checknickname.dto";
import { Likes } from "src/likes/likes.entity";
import { Scraps } from "src/scraps/scraps.entity";
import { Comments } from "src/comments/comments.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserInfos)
    private readonly userInfoRepository: Repository<UserInfos>,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
    @InjectRepository(Likes)
    private readonly likeRepository: Repository<Likes>,
    @InjectRepository(Scraps)
    private readonly scrapRepository: Repository<Scraps>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>
  ) {}

  async signup(signUpDto: SignUpDto): Promise<{ nickname: string }> {
    try {
      const user = this.userRepository.create({
        id: signUpDto.id,
        password: signUpDto.password,
      });
      await this.userRepository.save(user);

      const userInfo = this.userInfoRepository.create({
        email: signUpDto.email,
        nickname: signUpDto.nickname,
        profileUrl: "기본사진",
        myStatus: "기본상태",
        user: user,
      });
      await this.userInfoRepository.save(userInfo);
      return { nickname: userInfo.nickname };
    } catch (error) {
      if (error.code === 23505) {
        throw new ConflictException("중복된 아이디 입니다");
      }
    }
  }

  async checkId(checkIdDto: CheckIdDto) {
    try {
      const { id } = checkIdDto;
      const user = this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new ConflictException("중복된 아이디 입니다");
      }
      return { id };
    } catch (error) {
      throw new InternalServerErrorException("id 확인 시 서버 에러");
    }
  }

  async checkNickname(checkNicknameDto: CheckNicknameDto) {
    try {
      const { nickname } = checkNicknameDto;
      const user = this.userInfoRepository.findOne({ where: { nickname } });
      if (!user) {
        throw new ConflictException("중복된 닉네임 입니다");
      }
      return { nickname };
    } catch (error) {
      throw new InternalServerErrorException("서버 에러");
    }
  }

  async login(
    id: string,
    password: string
  ): Promise<{ nickname: string; token: string; message: string }> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException("회원 정보가 일치하지 않습니다.");
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const secretKey = this.configService.get("JWTKEY");
        const token = jwt.sign({ userId: user.userId }, secretKey, {
          expiresIn: "1h",
        });

        const userInfo = await this.userInfoRepository.findOne({
          where: { user: { userId: user.userId } },
        });
        return { nickname: userInfo.nickname, token, message: "로그인 성공" };
      }
    } catch (error) {
      throw new NotFoundException("회원 정보가 일치하지 않습니다.");
    }
  }

  async uploadProfile(userId: number, buffer: Buffer, fileName: string) {
    try {
      const fileUrl = await this.s3Service.uploadFileToS3(buffer, fileName);
      const userInfo = await this.userInfoRepository.findOne({
        where: { user: { userId } },
      });
      if (userInfo) {
        userInfo.profileUrl = fileUrl;
        await this.userInfoRepository.save(userInfo);
      }
      return;
    } catch (error) {
      throw new InternalServerErrorException("서버 에러");
    }
  }

  async deleteuser(userId: number): Promise<{ message: string }> {
    try {
      const userNickname = await this.userInfoRepository.findOne({
        where: { user: { userId } },
      });
      await this.userRepository.delete({ userId });
      await this.userInfoRepository.delete({ user: { userId } });
      return { message: `${userNickname.nickname}의 탈퇴가 완료 되었습니다.` };
    } catch (error) {
      throw new NotFoundException("회원 정보가 일치하지 않습니다.");
    }
  }

  async findLikeMusic(userId: number) {
    const music = await this.likeRepository
      .createQueryBuilder("likes")
      .select("likes.music", "music")
      .where("likes.user = :userId", { userId })
      .getMany();

    return music.map((item) => item.music);
  }

  async findScrapMusic(userId: number) {
    const music = await this.scrapRepository
      .createQueryBuilder("scraps")
      .select("scraps.music", "music")
      .where("scraps.user = :userId", { userId })
      .getMany();

    return music.map((item) => item.music);
  }

  async findMyComments(userId: number) {
    const comments = await this.commentRepository.find({
      where: { user: { userId } },
    });
    const userInfo = await this.userInfoRepository.findOne({
      where: { user: { userId } },
    });

    return { nickname: userInfo.nickname, comments };
  }
}
