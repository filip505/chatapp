"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authMiddleware", {
  enumerable: true,
  get: function get() {
    return _auth.default;
  }
});
Object.defineProperty(exports, "oauthMiddleware", {
  enumerable: true,
  get: function get() {
    return _oauth.default;
  }
});
Object.defineProperty(exports, "dtoValidatorMiddleware", {
  enumerable: true,
  get: function get() {
    return _dtoValidator.default;
  }
});

var _auth = _interopRequireDefault(require("./auth.middleware"));

var _oauth = _interopRequireDefault(require("./oauth.middleware"));

var _dtoValidator = _interopRequireDefault(require("./dto.validator.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map