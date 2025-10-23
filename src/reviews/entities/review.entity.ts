import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    review_id: number;

    @Column({ type: 'tinyint', unsigned: true })
    rating: number;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @CreateDateColumn({
        type: 'datetime',
        precision: 3,
        default: () => 'CURRENT_TIMESTAMP(3)',
    })
    created_at: Date;
    
    @UpdateDateColumn({
        type: 'datetime',
        precision: 3,
        default: () => 'CURRENT_TIMESTAMP(3)',
        onUpdate: 'CURRENT_TIMESTAMP(3)',
    })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'fk_review_user' })
    user: User;
}
