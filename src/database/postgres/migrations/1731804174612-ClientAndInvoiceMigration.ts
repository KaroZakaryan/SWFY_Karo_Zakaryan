import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClientAndInvoiceMigration1731804174612
  implements MigrationInterface
{
  name = 'ClientAndInvoiceMigration1731804174612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "line_items"`);
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "customer_data"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "status" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "quoteNumber" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" ADD "lineItems" jsonb`);
    await queryRunner.query(`ALTER TABLE "invoices" ADD "issuedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "invoices" ADD "customerData" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "clientId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce"`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "invoices" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_d9df936180710f9968da7cf4a51" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_d9df936180710f9968da7cf4a51"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce"`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "clientId"`);
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP COLUMN "customerData"`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "issuedAt"`);
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "lineItems"`);
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "quoteNumber"`);
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "invoices" ADD "customer_data" jsonb`);
    await queryRunner.query(`ALTER TABLE "invoices" ADD "line_items" jsonb`);
    await queryRunner.query(`DROP TABLE "clients"`);
  }
}
