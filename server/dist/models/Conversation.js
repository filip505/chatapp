"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = new _typeorm.EntitySchema({
  name: "conversation",
  columns: {
    id: {
      generated: "uuid",
      primary: true,
      type: "uuid"
    },
    lastMessageId: {
      name: 'lastMessageId',
      type: 'uuid',
      nullable: true
    },
    cretedAt: {
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp'
    }
  },
  relations: {
    messages: {
      target: 'message',
      type: 'one-to-many',
      inverseSide: 'conversation',
      cascade: true //joinColumn: true

    },
    subjects: {
      target: 'subject',
      type: 'one-to-many',
      inverseSide: 'conversation',
      cascade: true
    }
  }
});

exports.default = _default;
//# sourceMappingURL=Conversation.js.map