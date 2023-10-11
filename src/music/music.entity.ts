import { Comments } from "src/comments/comments.entity";
import { Likes } from "src/likes/likes.entity";
import { Scraps } from "src/scraps/scraps.entity";
import { Streamings } from "src/streamings/streamings.entity";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ViewColumn,
} from "typeorm";
import { ViewColumnOptions } from "typeorm/decorator/options/ViewColumnOptions";

@Entity()
export class Musics {
  @PrimaryGeneratedColumn()
  musicId: number;

  @Column()
  musicTitle: string;

  @Column()
  musicContent: string;

  @Column()
  musicUrl: string;

  @OneToMany(() => Comments, (comment) => comment.music)
  comments: Comment[];

  @OneToMany(() => Likes, (like) => like.music)
  likes: Likes[];

  @OneToMany(() => Scraps, (scrap) => scrap.music)
  scraps: Scraps[];

  @OneToMany(() => Streamings, (streaming) => streaming.music)
  streaming: Streamings[];

  @ViewColumn({ select: false } as ViewColumnOptions)
  streamingCount: number;

  @ViewColumn({ select: false } as ViewColumnOptions)
  likeCount: number;

  @ViewColumn({ select: false } as ViewColumnOptions)
  scrapCount: number;

  @ViewColumn({ select: false } as ViewColumnOptions)
  commentCount: number;

  @ViewColumn({ select: false } as ViewColumnOptions)
  totalScore: number;
}
