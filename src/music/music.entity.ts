import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
