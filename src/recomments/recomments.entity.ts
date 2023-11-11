import { Comments } from "src/comments/comments.entity";
import { Status } from "src/status/status.entity";
import { Users } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Recomments {
  @PrimaryGeneratedColumn()
  recommentId: number;

  @Column()
  recomment: string;

  @ManyToOne(() => Users, (user) => user.recomments)
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column()
  userId: number;

  @ManyToOne(() => Comments, (comment) => comment.recomments)
  @JoinColumn({ name: "commentId" })
  comment: Comments;

  @Column()
  commentId: number;

  @ManyToOne(() => Status, (status) => status.recomment)
  @JoinColumn({ name: "statusId" })
  status: Status;

  @Column()
  statusId: number;
}
