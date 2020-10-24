import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('professionals')
class Professional {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    job: string;

    @Column()
    price: number;

    @Column()
    tax: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}

export default Professional;
