import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProducts1692536718788 implements MigrationInterface {
  name = 'CreateProducts1692536718788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "name" varchar NOT NULL,
        "description" varchar NOT NULL,
        "price_subunit" integer NOT NULL,
        "price_currency" varchar NOT NULL,
        "created_at" datetime NOT NULL DEFAULT (datetime('now')),
        "updated_at" datetime NOT NULL DEFAULT (datetime('now'))
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
