import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Streamings {
  @PrimaryGeneratedColumn()
  streamingId: number;

  @ManyToOne(() => Users, (user) => user.streaming)
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column()
  userId: number;

  @ManyToOne(() => Musics, (music) => music.streaming)
  @JoinColumn({ name: "musicId" })
  music: Musics;

  @Column()
  musicId: number;
}
