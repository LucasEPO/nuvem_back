import { CartItem } from "src/cart_itens/entities/cart_item_entity";
import { User } from "src/users/entities/user.entity";
import { CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    cart_id: string;

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

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cart_itens: CartItem[];

}
