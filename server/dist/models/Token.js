"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = new _typeorm.EntitySchema({
  name: "token",
  table: {
    name: "token"
  },
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid"
    },
    personId: {
      type: "uuid"
    }
  },
  relations: {
    person: {
      target: 'person',
      type: 'many-to-one',
      inverseSide: 'tokens' //joinColumn: true

    }
  }
});

exports.default = _default;
//# sourceMappingURL=Token.js.map