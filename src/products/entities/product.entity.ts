import { CartItem } from "src/cart_itens/entities/cart_item_entity";
import { Category } from "src/categories/entities/category.entity";
import { Collection } from "src/collections/entities/collection.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('products')
export class Product {
    @PrimaryColumn({ type: 'binary', length: 16 })
    product_id: Buffer;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int', unsigned: true, default: 0 })
    quantity: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image_url?: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    size?: string;

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

    @ManyToOne(() => Collection, (collection) => collection.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'fk_product_collection' })
    collection: Collection;

    @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'fk_product_category' })
    category: Category;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cart_itens: CartItem[];

    // Converte UUID string → binário (para compatibilidade com UUID_TO_BIN)
    @BeforeInsert()
    generateId() {
    if (!this.product_id) {
      const uuid = uuidv4().replace(/-/g, '');
      this.product_id = Buffer.from(uuid, 'hex');
    }
  }
}