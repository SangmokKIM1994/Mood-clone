import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  comment: string;

  @ManyToOne(() => Musics, (music) => music.comments)
  music: Musics;

  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;
}
