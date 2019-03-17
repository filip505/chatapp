"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = new _typeorm.EntitySchema({
  name: "subject",
  table: {
    name: "subject"
  },
  columns: {
    personId: {
      type: "uuid",
      primary: true
    },
    conversationId: {
      type: "uuid",
      primary: true
    },
    companionId: {
      type: "uuid",
      primary: true
    },
    messageCount: {
      name: 'messageCount',
      type: 'integer',
      default: 0
    }
  },
  relations: {
    person: {
      target: 'person',
      type: 'many-to-one',
      inverseSide: 'subjects'
    },
    conversation: {
      target: 'conversation',
      type: 'many-to-one',
      inverseSide: 'subjects'
    },
    companion: {
      target: 'person',
      type: 'many-to-one',
      inverseSide: 'companions'
    }
  }
});

exports.default = _default;
//# sourceMappingURL=Subject.js.map