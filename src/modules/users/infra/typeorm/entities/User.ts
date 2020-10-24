import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name: string;

    @Column()
    second_name: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    cep: string;

    @Column()
    address: string;

    @Column()
    number: number;

    @Column()
    complement: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    password_hash: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
