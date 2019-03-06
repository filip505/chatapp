export default {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/root.json",
  "type": "object",
  "title": "The Root Schema",
  "required": [
    "receiverId",
    "text"
  ],
  "properties": {
    "receiverId": {
      "$id": "#/properties/receiverId",
      "type": "string",
      "title": "The Receiverid Schema",
      "default": "",
      "examples": [
        "0c5bf941-eb04-418d-9354-d78fb9571718"
      ],
      "pattern": "^(.*)$"
    },
    "text": {
      "$id": "#/properties/text",
      "type": "string",
      "title": "The Text Schema",
      "default": "",
      "examples": [
        "test"
      ],
      "pattern": "^(.*)$"
    }
  }

}