import { Cart } from "src/carts/entities/cart.entity";
import { Print } from "src/prints/entities/print.entity";
import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cart-itens')
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    cart_item_id: string;

    @Column({ type: 'int', unsigned: true })
    quantity: number;

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

    @ManyToOne(() => Print, (print) => print.cart_itens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'fk_cart_item_print' })
    print: Print;

    @ManyToOne(() => Product, (product) => product.cart_itens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'fk_cart_item_product' })
    product: Product;

    @ManyToOne(() => Cart, (cart) => cart.cart_itens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'fk_cart_item_cart' })
    cart: Cart;
}
