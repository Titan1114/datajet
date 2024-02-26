import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1708926089677 implements MigrationInterface {
    name = 'NewMigration1708926089677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "data_source" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" text NOT NULL, "options" text, "isDefault" boolean NOT NULL DEFAULT false, "created_userId" uuid NOT NULL, "updated_userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4dad0bcd9e3ae282a371615d78a" UNIQUE ("name"), CONSTRAINT "PK_9775f6b6312a926ed37d3af7d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "properties" text NOT NULL, "data" text NOT NULL, "created_userId" uuid NOT NULL, "updated_userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a60bfff7094fd0352057e8b44e8" UNIQUE ("name"), CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying, "password" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "query" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "options" text NOT NULL, "datasource_id" uuid NOT NULL, "created_userId" uuid NOT NULL, "updated_userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8500d3b8fbf208a0ea25475e585" UNIQUE ("name"), CONSTRAINT "PK_be23114e9d505264e2fdd227537" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "data_source" ADD CONSTRAINT "FK_fe70f6f9e391419491d2f47636f" FOREIGN KEY ("created_userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "data_source" ADD CONSTRAINT "FK_e691e575819c1e9b5460f0955e9" FOREIGN KEY ("updated_userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_adb9a4467f26395cbca158d7cc3" FOREIGN KEY ("created_userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_dca4fe24e114cf64699635c7145" FOREIGN KEY ("updated_userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "query" ADD CONSTRAINT "FK_7b344eb3f518548ff7f59207124" FOREIGN KEY ("created_userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "query" ADD CONSTRAINT "FK_f872fc7317e7d3c81840e2c7d25" FOREIGN KEY ("updated_userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "query" ADD CONSTRAINT "FK_21e982e2cd88c0f56940c543218" FOREIGN KEY ("datasource_id") REFERENCES "data_source"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "query" DROP CONSTRAINT "FK_21e982e2cd88c0f56940c543218"`);
        await queryRunner.query(`ALTER TABLE "query" DROP CONSTRAINT "FK_f872fc7317e7d3c81840e2c7d25"`);
        await queryRunner.query(`ALTER TABLE "query" DROP CONSTRAINT "FK_7b344eb3f518548ff7f59207124"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_dca4fe24e114cf64699635c7145"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_adb9a4467f26395cbca158d7cc3"`);
        await queryRunner.query(`ALTER TABLE "data_source" DROP CONSTRAINT "FK_e691e575819c1e9b5460f0955e9"`);
        await queryRunner.query(`ALTER TABLE "data_source" DROP CONSTRAINT "FK_fe70f6f9e391419491d2f47636f"`);
        await queryRunner.query(`DROP TABLE "query"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "component"`);
        await queryRunner.query(`DROP TABLE "data_source"`);
    }

}
