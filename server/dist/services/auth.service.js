"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _uuid = require("uuid");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AuthService =
/*#__PURE__*/
function () {
  function AuthService() {
    _classCallCheck(this, AuthService);

    _defineProperty(this, "personRepository", (0, _typeorm.getRepository)('person'));

    _defineProperty(this, "tokenRepository", (0, _typeorm.getRepository)('token'));
  }

  _createClass(AuthService, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(email, password, key, oneSignalId) {
        var user, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.personRepository.findOne({
                  email: email,
                  password: password
                });

              case 2:
                user = _context.sent;

                if (!user) {
                  _context.next = 13;
                  break;
                }

                _context.next = 6;
                return this.tokenRepository.save({
                  person: user
                });

              case 6:
                token = _context.sent;
                console.log('oneSignalID', oneSignalId);
                _context.next = 10;
                return this.personRepository.save(_objectSpread({}, user, {
                  key: key,
                  oneSignalId: oneSignalId
                }));

              case 10:
                return _context.abrupt("return", _objectSpread({}, user, {
                  token: token.id
                }));

              case 13:
                throw {
                  status: 403,
                  body: 'invalid user or password'
                };

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2, _x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(user) {
        var exsists;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                user.id = (0, _uuid.v1)();
                _context2.next = 3;
                return this.personRepository.findOne({
                  email: user.email
                });

              case 3:
                exsists = _context2.sent;

                if (!exsists) {
                  _context2.next = 6;
                  break;
                }

                throw {
                  status: 409,
                  body: 'email allready registered'
                };

              case 6:
                _context2.next = 8;
                return this.personRepository.save(user);

              case 8:
                return _context2.abrupt("return", user);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function signUp(_x5) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "validateToken",
    value: function () {
      var _validateToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(token) {
        var tokenDb, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return this.tokenRepository.findOne({
                  id: token
                });

              case 3:
                tokenDb = _context3.sent;
                _context3.next = 6;
                return this.personRepository.findOne({
                  id: tokenDb.personId
                });

              case 6:
                user = _context3.sent;
                user.role = 'user';
                return _context3.abrupt("return", user);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                console.log('token', 'invalid');

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 11]]);
      }));

      function validateToken(_x6) {
        return _validateToken.apply(this, arguments);
      }

      return validateToken;
    }()
  }]);

  return AuthService;
}();

var _default = new AuthService();

exports.default = _default;
//# sourceMappingURL=auth.service.js.map