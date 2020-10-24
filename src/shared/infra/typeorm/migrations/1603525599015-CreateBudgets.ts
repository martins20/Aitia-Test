import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBudgets1603525599015 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'budgets',
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
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'dev_quantity',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'designer_quantity',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'sm_quantity',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'po_quantity',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'min_days',
                        type: 'integer',
                        isNullable: false,
                        default: 10,
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
        await queryRunner.dropTable('budgets');
    }
}
