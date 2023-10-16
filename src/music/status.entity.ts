import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Musics } from "./music.entity";
import { Scraps } from "src/scraps/scraps.entity";
import { Likes } from "src/likes/likes.entity";
import { Recomments } from "src/recomments/recomments.entity";
import { Comments } from "src/comments/comments.entity";
import { Streamings } from "src/streamings/streamings.entity";


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

  @ManyToMany(() => Recomments, (recomment) => recomment.status)
  recomment: Recomments[];

  @ManyToMany(() => Comments, (comment) => comment.status)
  comment: Comments[];

  @ManyToMany(() => Streamings, (streaming) => streaming.status)
  streaming: Streamings[];
}
