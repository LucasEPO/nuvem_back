import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum PrintType {
  ANIME = 'anime',
  GEEK = 'geek',
  EXCLUSIVA = 'exclusiva',
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
}
