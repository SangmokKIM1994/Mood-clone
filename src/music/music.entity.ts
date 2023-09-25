import { Comments } from "src/comments/comments.entity";
import { Likes } from "src/likes/likes.entity";
import { Scraps } from "src/scraps/scraps.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
}
