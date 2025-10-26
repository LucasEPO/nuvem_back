import { Cart } from "src/carts/entities/cart.entity";
import { Print } from "src/prints/entities/print.entity";
import { Product } from "src/products/entities/product.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('cart-itens')
export class CartItem {
    @PrimaryColumn({ type: 'binary', length: 16 })
    cart_id: Buffer;

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

    // Converte UUID string → binário (para compatibilidade com UUID_TO_BIN)
    @BeforeInsert()
    generateId() {
        if (!this.cart_id) {
            const uuid = uuidv4().replace(/-/g, '');
            this.cart_id = Buffer.from(uuid, 'hex');
        }
    }
}
