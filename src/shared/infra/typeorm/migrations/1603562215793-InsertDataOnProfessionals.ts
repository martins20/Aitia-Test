import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDataOnProfessionals1603562215793
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert('professionals', {
            job: 'dev',
            price: 1000,
            tax: 15,
        });

        await queryRunner.manager.insert('professionals', {
            job: 'design',
            price: 1000,
            tax: 5,
        });

        await queryRunner.manager.insert('professionals', {
            job: 'sm',
            price: 900,
            tax: 12,
        });

        await queryRunner.manager.insert('professionals', {
            job: 'po',
            price: 1500,
            tax: 10,
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete('professionals', {
            job: 'po',
            price: 1500,
            tax: 10,
        });

        await queryRunner.manager.delete('professionals', {
            job: 'sm',
            price: 900,
            tax: 12,
        });

        await queryRunner.manager.delete('professionals', {
            job: 'design',
            price: 1000,
            tax: 5,
        });

        await queryRunner.manager.delete('professionals', {
            job: 'dev',
            price: 1000,
            tax: 15,
        });
    }
}
