import { CartItem } from "src/cart_itens/entities/cart_item_entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum PrintType {
  ANIME = 'ANIME',
  GEEK = 'GEEK',
  EXCLUSIVA = 'EXCLUSIVA',
}

@Entity('prints')
export class Print {
    @PrimaryGeneratedColumn()
    print_id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;
    
    @Column({ type: 'varchar', length: 10, unique: true })
    code: string;
    
    @Column({ type: 'varchar', length: 255 })
    image_url: string;

    @Column({ type: 'enum', enum: PrintType})
    type: PrintType;

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

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cart_itens: CartItem[];
}
