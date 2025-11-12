import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
