import { Musics } from "src/music/music.entity";
import { Status } from "src/status/status.entity";
import { Users } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  likeId: number;

  @ManyToOne(() => Users, (user) => user.likes)
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column()
  userId: number;

  @ManyToOne(() => Musics, (music) => music.likes)
  @JoinColumn({ name: "musicId" })
  music: Musics;

  @Column()
  musicId: number;

  @ManyToOne(() => Status, (status) => status.like)
  @JoinColumn({ name: "statusId" })
  status: Status;

  @Column()
  statusId: number;
}
