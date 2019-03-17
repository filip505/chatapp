"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = new _typeorm.EntitySchema({
  name: "message",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid"
    },
    text: {
      name: 'text',
      type: "varchar"
    },
    senderId: {
      name: 'senderId',
      type: "uuid"
    },
    receiverId: {
      name: 'receiverId',
      type: "uuid"
    },
    conversationId: {
      name: 'conversationId',
      type: "uuid"
    },
    createdAt: {
      name: 'createdAt',
      type: 'timestamp'
    }
  },
  relations: {
    conversation: {
      target: 'conversation',
      type: 'many-to-one',
      inverseSide: 'messages' //joinColumn: true

    }
  }
});

exports.default = _default;
//# sourceMappingURL=Message.js.map