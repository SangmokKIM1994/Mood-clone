import { Musics } from "src/music/music.entity";
import { Status } from "src/status/status.entity";
import { Users } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
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

  @ManyToMany(() => Status, (status) => status.like)
  status: Status;
}
