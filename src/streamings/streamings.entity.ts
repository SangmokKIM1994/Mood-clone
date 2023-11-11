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

  @ManyToOne(() => Status, (status) => status.streaming)
  @JoinColumn({ name: "statusId" })
  status: Status;

  @Column()
  statusId: number;
}
