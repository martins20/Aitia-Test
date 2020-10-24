import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('budgets')
class Budget {
    @PrimaryGeneratedColumn('uuid')
    budget_id: string;

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

    @Column()
    owner_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'owner_id' })
    id: User;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}

export default Budget;
