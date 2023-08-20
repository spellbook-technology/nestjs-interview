import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1692542018714 implements MigrationInterface {
  name = 'CreateUsers1692542018714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "username" varchar NOT NULL,
        "encrypted_password" varchar NOT NULL,
        "created_at" datetime NOT NULL DEFAULT (datetime('now')),
        "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
        CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
