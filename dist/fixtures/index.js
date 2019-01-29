'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (connection) {
  return {
    init: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.createUser();

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }(),
    createUser: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var firstName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'test';
        var lastName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'test';
        var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'test';
        var pass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'test';
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return connection.getRepository('person').save({
                  id: (0, _uuid2.default)(),
                  firstName: firstName,
                  lastName: lastName,
                  name: name,
                  pass: pass
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createUser() {
        return _ref2.apply(this, arguments);
      }

      return createUser;
    }()
  };
};

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=index.js.map