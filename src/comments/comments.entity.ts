import { Musics } from "src/music/music.entity";
import { Status } from "src/music/status.entity";
import { Recomments } from "src/recomments/recomments.entity";
import { Users } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
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

  @ManyToOne(() => Users, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column()
  userId: number;

  @ManyToOne(() => Musics, (music) => music.comments)
  @JoinColumn({ name: "musicId" })
  music: Musics;

  @Column()
  musicId: number;

  @OneToMany(() => Recomments, (recomment) => recomment.comment)
  recomments: Recomments[];

  @ViewColumn({ select: false } as ViewColumnOptions)
  recommentCount: number;

  @ManyToMany(() => Status, (status) => status.comment)
  status: Status[];
}
