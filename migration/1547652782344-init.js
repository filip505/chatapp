function init1547652782344() {}
init1547652782344.prototype.up = async function (qr) {
   qr.query('create table person (id uuid, email varchar, key varchar, firstName varchar, lastName varchar, password varchar,  PRIMARY KEY(id));');
   qr.query('create table token (id uuid, "personId" uuid,  FOREIGN KEY ("personId") REFERENCES person(id) ON DELETE CASCADE, PRIMARY KEY(id))');
   qr.query('create table message (id uuid, text varchar, "senderId" uuid, "receiverId" uuid, FOREIGN KEY ("senderId") REFERENCES person(id) ON DELETE CASCADE, FOREIGN KEY ("receiverId") REFERENCES person(id) ON DELETE CASCADE, PRIMARY KEY(id))');
};
init1547652782344.prototype.down = async function (queryRunner) {

};
exports.init1547652782344 = init1547652782344;