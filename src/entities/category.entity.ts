import { Post } from "src/entities/post.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;

  @ManyToMany(() => Post)
  @JoinTable({
    name: 'post_categories'
  })
  posts: Post[];
}