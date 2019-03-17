"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _middleware = require("./../middleware");

var _util = require("./../util");

var _middleware2 = require("../middleware");

var _express = require("express");

var _createMessage = _interopRequireDefault(require("../dto/createMessage"));

var _message = _interopRequireDefault(require("../services/message.service"));

var _socket = _interopRequireDefault(require("../socket"));

var _oneSignal = _interopRequireDefault(require("./../services/one.signal.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post('', (0, _middleware.oauthMiddleware)('user'), //validate(createMessageShema),
(0, _util.errorHandler)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var user, body, conversationId, number, text, message;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = req.user, body = req.body;
            conversationId = body.conversationId, number = body.number, text = body.text;
            _context.next = 4;
            return _message.default.createMessage(conversationId, number, text, user);

          case 4:
            message = _context.sent;

            _socket.default.sendMessage(message).catch(function () {
              return _oneSignal.default.sendNotification(message, user);
            });

            res.send(message);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
router.get('/conversation/:conversationId', (0, _middleware.oauthMiddleware)('user'), (0, _util.errorHandler)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var user, conversationId, messages;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = req.user;
            conversationId = req.params.conversationId;
            _context2.next = 4;
            return _message.default.getMessages(conversationId, user);

          case 4:
            messages = _context2.sent;
            res.send(messages);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()));
var _default = router;
exports.default = _default;
//# sourceMappingURL=message.controller.js.map