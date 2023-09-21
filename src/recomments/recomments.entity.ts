import { Comments } from "src/comments/comments.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recomments {
  @PrimaryGeneratedColumn()
  recommentId: number;

  @Column()
  recomment: string;

  @ManyToOne(() => Users, (user) => user.recomments)
  user: Users;

  @ManyToOne(() => Comments, (comment) => comment.recomments)
  comment: Comments;
}
