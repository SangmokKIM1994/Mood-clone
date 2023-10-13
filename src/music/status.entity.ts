import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Musics } from "./music.entity";

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  statusId: number;

  @Column()
  status: string;

  @ManyToMany(() => Musics, (music) => music.status)
  music: Musics[];
}
