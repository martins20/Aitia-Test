import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1603501468165 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'second_name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isNullable: false,
                        length: '11',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'company_name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'cep',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'number',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'password_hash',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
