import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Scraps {
  @PrimaryGeneratedColumn()
  scrapId: number;

  @ManyToOne(() => Musics, (music) => music.scraps)
  music: Musics;

  @ManyToOne(() => Users, (user) => user.scraps)
  user: Users;
}
