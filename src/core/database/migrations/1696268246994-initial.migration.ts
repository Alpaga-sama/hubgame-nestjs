import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1696268246994 implements MigrationInterface {
  name = 'initialMigration1696268246994';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_a3ffb1c0c8416b9fc6f907b7433" DEFAULT NEWSEQUENTIALID(), "username" varchar(100) NOT NULL, "password" varchar(255) NOT NULL, "isActive" tinyint NOT NULL CONSTRAINT "DF_409a0298fdd86a6495e23c25c66" DEFAULT 0, CONSTRAINT "PK_User_ID" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_User_USERNAME" ON "users" ("username") `,
    );
    await queryRunner.query(
      `CREATE TABLE "games" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_c9b16b62917b5595af982d66337" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "owned" tinyint NOT NULL CONSTRAINT "DF_5ea5aadaca378afb14a4ac7b5b6" DEFAULT 0, "created" datetime2 NOT NULL CONSTRAINT "DF_6808cc3f59ae98427a863a3b56c" DEFAULT getdate(), "createdBy" uniqueidentifier NOT NULL, "updated" datetime2 NOT NULL CONSTRAINT "DF_99edfa6f5d8d8f24c89b0455287" DEFAULT getdate(), "updatedBy" uniqueidentifier NOT NULL, CONSTRAINT "PK_Game_ID" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_Game_NAME" ON "games" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_24dbc6126a28ff948da33e97d3b" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "created" datetime2 NOT NULL CONSTRAINT "DF_e116740e6ac1af79dee3488f7ed" DEFAULT getdate(), "createdBy" uniqueidentifier NOT NULL, "updated" datetime2 NOT NULL CONSTRAINT "DF_8f2e63715dc850e0e27e640ce95" DEFAULT getdate(), "updatedBy" uniqueidentifier NOT NULL, CONSTRAINT "PK_Category_ID" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_8b0be371d28245da6e4f4b6187" ON "categories" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "games_categories" ("gamesId" uniqueidentifier NOT NULL, "categoriesId" uniqueidentifier NOT NULL, CONSTRAINT "PK_0d3414efb7cc0a19aef3c16bf4a" PRIMARY KEY ("gamesId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce471082a0babc162240ab0ba2" ON "games_categories" ("gamesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c2d340931ca0ebccf9c09a2277" ON "games_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD CONSTRAINT "FK_Game_CREATEDBY" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD CONSTRAINT "FK_Game_UPDATEDBY" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_Category_CREATEDBY" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_Category_UPDATEDBY" FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "games_categories" ADD CONSTRAINT "FK_ce471082a0babc162240ab0ba2a" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "games_categories" ADD CONSTRAINT "FK_c2d340931ca0ebccf9c09a22778" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "games_categories" DROP CONSTRAINT "FK_c2d340931ca0ebccf9c09a22778"`,
    );
    await queryRunner.query(
      `ALTER TABLE "games_categories" DROP CONSTRAINT "FK_ce471082a0babc162240ab0ba2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_Category_UPDATEDBY"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_Category_CREATEDBY"`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" DROP CONSTRAINT "FK_Game_UPDATEDBY"`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" DROP CONSTRAINT "FK_Game_CREATEDBY"`,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_c2d340931ca0ebccf9c09a2277" ON "games_categories"`,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_ce471082a0babc162240ab0ba2" ON "games_categories"`,
    );
    await queryRunner.query(`DROP TABLE "games_categories"`);
    await queryRunner.query(
      `DROP INDEX "IDX_8b0be371d28245da6e4f4b6187" ON "categories"`,
    );
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP INDEX "IDX_Game_NAME" ON "games"`);
    await queryRunner.query(`DROP TABLE "games"`);
    await queryRunner.query(`DROP INDEX "IDX_User_USERNAME" ON "users"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
