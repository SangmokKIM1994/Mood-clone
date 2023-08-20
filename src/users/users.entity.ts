import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfos } from './userInfos.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  id: string;

  @Column()
  password: string;

  @OneToOne(() => UserInfos, (userInfo) => userInfo.user, { cascade: true })
  @JoinColumn()
  userInfo: UserInfos;
}
