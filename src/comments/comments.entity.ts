import { Musics } from "src/music/music.entity";
import { Recomments } from "src/recomments/recomments.entity";
import { Users } from "src/users/users.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ViewColumn,
} from "typeorm";
import { ViewColumnOptions } from "typeorm/decorator/options/ViewColumnOptions";

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

  @OneToMany(() => Recomments, (recomment) => recomment.comment)
  recomments: Recomments[];

  @ViewColumn({ select: false } as ViewColumnOptions)
  recommentCount: number;
}
