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

    @Column('integer')
    dev_quantity: number;

    @Column('integer')
    designer_quantity: number;

    @Column('integer')
    sm_quantity: number;

    @Column('integer')
    po_quantity: number;

    @Column('integer')
    min_days: number;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}

export default Budget;
