import { InternalServerErrorException } from "@nestjs/common";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { UserInfos } from "./userInfos.entity";

dotenv.config();

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  id: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      const hashKey = process.env.HASHKEY;
      this.password = await bcrypt.hash(this.password, Number(hashKey));
    } catch (error) {
      throw new InternalServerErrorException(
        "비밀번호 암호화에 문제가 생겼습니다."
      );
    }
  }

  @OneToOne(() => UserInfos, (userInfo) => userInfo.user, { cascade: true })
  @JoinColumn()
  userInfo: UserInfos;
}
