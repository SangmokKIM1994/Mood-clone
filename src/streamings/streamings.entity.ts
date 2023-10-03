import { Musics } from "src/music/music.entity";
import { Users } from "src/users/users.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Streamings {
  @PrimaryGeneratedColumn()
  streamingId: number;

  @ManyToOne(() => Users, (user) => user.streaming)
  user: Users;

  @ManyToOne(() => Musics, (music) => music.streaming)
  music: Musics;
}
