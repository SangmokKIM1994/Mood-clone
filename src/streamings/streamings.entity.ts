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

  @ManyToMany(() => Status, (status) => status.streaming)
  status: Status[];
}
