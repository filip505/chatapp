"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Fixtures =
/*#__PURE__*/
function () {
  function Fixtures() {
    _classCallCheck(this, Fixtures);
  }

  _createClass(Fixtures, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.createUser({
                  email: 'test',
                  password: 'test',
                  firstName: 'test',
                  lastName: 'test',
                  image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
                  number: '+4915',
                  key: 'bla',
                  oneSignalId: '241756c8-4264-11e9-b210-d663bd873d93',
                  tokens: [{}]
                });

              case 2:
                _context.next = 4;
                return this.createUser({
                  email: 'test1',
                  password: 'test1',
                  firstName: 'test1',
                  lastName: 'test1',
                  image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
                  key: 'bla',
                  oneSignalId: '241756c8-4264-11e9-b210-d663bd873d93',
                  number: '+491',
                  tokens: []
                });

              case 4:
                _context.next = 6;
                return this.createUser({
                  email: 'test2',
                  password: 'test2',
                  firstName: 'test2',
                  lastName: 'test2',
                  image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png',
                  key: 'bla',
                  oneSignalId: '241756c8-4264-11e9-b210-d663bd873d93',
                  number: '+4914',
                  tokens: []
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(user) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _typeorm.getRepository)('person').save(user);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }]);

  return Fixtures;
}();

var _default = new Fixtures();

exports.default = _default;
//# sourceMappingURL=index.js.map