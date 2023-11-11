import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Musics } from "../music/music.entity";
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

  @ManyToOne(() => Scraps, (scrap) => scrap.status)
  scrap: Scraps[];

  @ManyToOne(() => Likes, (like) => like.status)
  like: Likes[];

  @ManyToOne(() => Recomments, (recomment) => recomment.status)
  recomment: Recomments[];

  @ManyToOne(() => Comments, (comment) => comment.status)
  comment: Comments[];

  @ManyToOne(() => Streamings, (streaming) => streaming.status)
  streaming: Streamings[];
}
