import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { SignUpDto } from "./dto/signup.dto";
import { UserInfos } from "./userInfos.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserInfos)
    private readonly userInfoRepository: Repository<UserInfos>,
    private readonly configService: ConfigService
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
      throw new NotFoundException("회원 정보가  일치하지 않습니다.");
    }
  }
}
