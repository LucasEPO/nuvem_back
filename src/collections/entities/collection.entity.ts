import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('collections')
export class Collection {
    @PrimaryGeneratedColumn()
    collection_id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    image_url: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    logo_url: string;

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

    @OneToMany(() => Product, (product) => product.collection)
    products: Product[];
}