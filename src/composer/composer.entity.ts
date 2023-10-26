import { Musics } from "src/music/music.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Composers {
  @PrimaryGeneratedColumn()
  composerId: number;

  @Column()
  composerName: string;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "date", nullable: true })
  deathDate: Date;

  @Column({ nullable: true })
  nationality: string;

  @Column({ type: "text", nullable: true })
  biography: string;

  @OneToMany(() => Musics, (music) => music.composer)
  music: Musics[];
}
