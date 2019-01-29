"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "token",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid"
    },
    person: {
      type: "uuid"
    }
  }
};
//# sourceMappingURL=Token.js.map