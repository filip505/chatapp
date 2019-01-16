import { MigrationInterface, QueryRunner } from "typeorm";

export class init1547652782344 implements MigrationInterface {

    public async up(qr: QueryRunner): Promise<any> {
        qr.query('create table person (id uuid, name varchar(255), firstName varchar(255), lastName varchar(255), password varchar,  PRIMARY KEY(id));');
        qr.query('create table token (id uuid, person uuid,  FOREIGN KEY (person) REFERENCES person(id), PRIMARY KEY(id))');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
