"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/root.json",
  "type": "object",
  "title": "The Root Schema",
  "required": ["email", "password"],
  "properties": {
    "email": {
      "$id": "#/properties/email",
      "type": "string",
      "title": "The Email Schema",
      "default": "",
      "examples": ["test@test.com"],
      "pattern": "^(.*)$"
    },
    "password": {
      "$id": "#/properties/password",
      "type": "string",
      "title": "The Password Schema",
      "default": "",
      "examples": ["123"],
      "pattern": "^(.*)$"
    }
  }
};
//# sourceMappingURL=SignInSchema.js.map