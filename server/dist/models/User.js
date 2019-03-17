"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = new _typeorm.EntitySchema({
  name: "person",
  table: {
    name: "person"
  },
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid"
    },
    firstName: {
      name: 'firstname',
      type: "varchar"
    },
    lastName: {
      name: 'lastname',
      type: "varchar"
    },
    key: {
      type: "varchar"
    },
    password: {
      type: "varchar"
    },
    email: {
      type: "varchar"
    },
    number: {
      type: "varchar"
    },
    image: {
      type: "varchar"
    },
    oneSignalId: {
      name: 'oneSignalId',
      type: 'uuid'
    }
  },
  relations: {
    tokens: {
      target: 'token',
      type: 'one-to-many',
      inverseSide: 'person',
      cascade: true
    },
    subjects: {
      target: 'subject',
      type: 'one-to-many',
      inverseSide: 'person',
      cascade: true
    },
    companions: {
      target: 'subject',
      type: 'one-to-many',
      inverseSide: 'companion',
      cascade: true
    }
  }
});

exports.default = _default;
//# sourceMappingURL=User.js.map