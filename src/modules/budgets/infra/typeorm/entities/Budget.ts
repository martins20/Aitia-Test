import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('budgets')
class Budget {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('interger')
    dev_quantity: number;

    @Column('interger')
    designer_quantity: number;

    @Column('interger')
    sm_quantity: number;

    @Column('interger')
    po_quantity: number;

    @Column('interger')
    min_day: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}

export default Budget;
