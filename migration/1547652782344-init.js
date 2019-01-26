function init1547652782344() {}
init1547652782344.prototype.up = async function (qr) {
   qr.query('create table person (id uuid, name varchar(255), firstName varchar(255), lastName varchar(255), password varchar,  PRIMARY KEY(id));');
   qr.query('create table token (id uuid, person uuid,  FOREIGN KEY (person) REFERENCES person(id), PRIMARY KEY(id))');
};
init1547652782344.prototype.down = async function (queryRunner) {

};
exports.init1547652782344 = init1547652782344;