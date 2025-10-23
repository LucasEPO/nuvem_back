import { Review } from 'src/reviews/entities/review.entity';
import { Entity, PrimaryColumn, Column, CreateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'binary', length: 16 })
  user_id: Buffer;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @CreateDateColumn({
    type: 'datetime',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  created_at: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  // Converte UUID string → binário (para compatibilidade com UUID_TO_BIN)
  @BeforeInsert()
  generateId() {
    if (!this.user_id) {
      const uuid = uuidv4().replace(/-/g, '');
      this.user_id = Buffer.from(uuid, 'hex');
    }
  }
}
