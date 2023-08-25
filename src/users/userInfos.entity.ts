import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class UserInfos {
  @PrimaryGeneratedColumn()
  userInfoId: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  profileUrl: string;

  @Column()
  myStatus: string;

  @OneToOne(() => Users, (user) => user.userInfo)
  @JoinColumn()
  user: Users;
}
