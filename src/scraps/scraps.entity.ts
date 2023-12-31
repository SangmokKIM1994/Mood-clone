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
export class Scraps {
  @PrimaryGeneratedColumn()
  scrapId: number;

  @ManyToOne(() => Users, (user) => user.scraps)
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column()
  userId: number;

  @ManyToOne(() => Musics, (music) => music.scraps)
  @JoinColumn({ name: "musicId" })
  music: Musics;

  @Column()
  musicId: number;

  @ManyToOne(() => Status, (status) => status.scrap)
  @JoinColumn({ name: "statusId" })
  status: Status;

  @Column()
  statusId: number;
}
