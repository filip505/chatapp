"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "person",
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
    password: {
      type: "varchar"
    },
    name: {
      type: "varchar"
    }
  }
};
//# sourceMappingURL=User.js.map