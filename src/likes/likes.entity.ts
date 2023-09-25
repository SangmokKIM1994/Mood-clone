import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  likeId: number;

  @ManyToOne(() => Musics, (music) => music.likes)
  music: Musics;

  @ManyToOne(() => Users, (user) => user.likes)
  user: Users;
}
