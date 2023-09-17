import { Comments } from "src/comments/comments.entity";
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
}
