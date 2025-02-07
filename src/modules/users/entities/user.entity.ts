import { Phone } from "src/modules/users/entities/phone.entity";
import { Post } from "src/modules/users/entities/post.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'tinyint',
    default: '1',
  })
  status: number;

  @Column({
    type: 'text',
    nullable: true
  })
  bio: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToOne(() => Phone, (phone) => phone.user)
  phone: Phone

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}
