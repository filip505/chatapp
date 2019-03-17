"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth.controller"));

var _message = _interopRequireDefault(require("./message.controller"));

var _user = _interopRequireDefault(require("./user.controller"));

var _conversation = _interopRequireDefault(require("./conversation.controller"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.use('/auth', _auth.default);
router.use('/user', _user.default);
router.use('/message', _message.default);
router.use('/conversation', _conversation.default);
var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map