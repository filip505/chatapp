"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _typeorm = require("typeorm");

var _middleware = require("../middleware");

var _dto = require("../dto");

var _auth = _interopRequireDefault(require("../services/auth.service"));

var _util = require("../util");

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post('/login', (0, _middleware.dtoValidatorMiddleware)(_dto.loginSchema), (0, _util.errorHandler)(
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, password, email, key, oneSignalId, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, password = _req$body.password, email = _req$body.email, key = _req$body.key, oneSignalId = _req$body.oneSignalId;
            _context.next = 3;
            return _auth.default.login(password, email, key, oneSignalId);

          case 3:
            response = _context.sent;
            res.send(response);

          case 5:
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
router.post('/signin', (0, _middleware.dtoValidatorMiddleware)(_dto.signInSchema), (0, _util.errorHandler)(
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _auth.default.signUp(req.body);

          case 2:
            user = _context2.sent;
            res.status(_httpStatusCodes.default.CREATED).send(user);

          case 4:
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
//# sourceMappingURL=auth.controller.js.map