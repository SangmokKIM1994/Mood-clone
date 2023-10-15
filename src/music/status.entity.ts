import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Musics } from "./music.entity";
import { Scraps } from "src/scraps/scraps.entity";
import { Likes } from "src/likes/likes.entity";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  statusId: number;

  @Column()
  status: string;

  @ManyToMany(() => Musics, (music) => music.status)
  music: Musics[];

  @ManyToMany(() => Scraps, (scrap) => scrap.status)
  scrap: Scraps[];

  @ManyToMany(() => Likes, (like) => like.status)
  like: Likes[];
}
