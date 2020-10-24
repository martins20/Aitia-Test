import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class InsertBudgetPriceToTableBudgets1603573878883
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'budgets',
            new TableColumn({
                name: 'budget_price',
                type: 'integer',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('budgets', 'budget_price');
    }
}
