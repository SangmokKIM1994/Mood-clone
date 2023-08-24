import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { Repository } from "typeorm";
import { SignUpDto } from "./dto/signup.dto";
import { UserInfos } from "./userInfos.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserInfos)
    private readonly userInfoRepository: Repository<UserInfos>
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
}
