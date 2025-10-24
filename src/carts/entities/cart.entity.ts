import { User } from "src/users/entities/user.entity";
import { BeforeInsert, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('carts')
export class Cart {
    @PrimaryColumn({ type: 'binary', length: 16 })
    cart_id: Buffer;

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

    @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'fk_cart_user' })
    user: User;

    // Converte UUID string → binário (para compatibilidade com UUID_TO_BIN)
    @BeforeInsert()
    generateId() {
        if (!this.cart_id) {
            const uuid = uuidv4().replace(/-/g, '');
            this.cart_id = Buffer.from(uuid, 'hex');
        }
    }
}
