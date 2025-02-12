import { Category } from "src/entities/category.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text'
  })
  content: string;

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

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'post_categories'
  })
  categories: Category[];
}