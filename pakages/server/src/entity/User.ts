import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Index({ unique: true })
  @Column()
  email: string

  @Column()
  name: string

  @CreateDateColumn()
  created_at: Date
}
