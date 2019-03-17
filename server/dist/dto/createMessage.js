"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/root.json",
  "type": "object",
  "title": "The Root Schema",
  "required": ["conversationId", "number", "text"],
  "properties": {
    "conversationId": {
      "$id": "#/properties/conversationId",
      "type": "string",
      "title": "The Conversationid Schema",
      "default": "",
      "examples": ["kkk"],
      "pattern": "^(.*)$"
    },
    "number": {
      "$id": "#/properties/number",
      "type": "string",
      "title": "The Number Schema",
      "default": "",
      "examples": ["kvk"],
      "pattern": "^(.*)$"
    },
    "text": {
      "$id": "#/properties/text",
      "type": "string",
      "title": "The Text Schema",
      "default": "",
      "examples": ["kk"],
      "pattern": "^(.*)$"
    }
  }
};
exports.default = _default;
//# sourceMappingURL=createMessage.js.map