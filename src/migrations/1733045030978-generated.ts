import { MigrationInterface, QueryRunner } from 'typeorm';

export class Generated1733045030978 implements MigrationInterface {
  name = 'Generated1733045030978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`submission\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`ipAddress\` varchar(255) NOT NULL, \`surveyId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`answer\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`answerText\` varchar(255) NOT NULL, \`submissionId\` varchar(36) NULL, \`questionId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`submission\` ADD CONSTRAINT \`FK_445eeaad33ae6464ac85f6ea46b\` FOREIGN KEY (\`surveyId\`) REFERENCES \`survey\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_1398cb4bf7f1ccc37fa0dd538ff\` FOREIGN KEY (\`submissionId\`) REFERENCES \`submission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_a4013f10cd6924793fbd5f0d637\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_a4013f10cd6924793fbd5f0d637\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_1398cb4bf7f1ccc37fa0dd538ff\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`submission\` DROP FOREIGN KEY \`FK_445eeaad33ae6464ac85f6ea46b\``,
    );
    await queryRunner.query(`DROP TABLE \`answer\``);
    await queryRunner.query(`DROP TABLE \`submission\``);
  }
}
