"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.unpack = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var unpack =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(promise) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return promise;

          case 3:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", null);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function unpack(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.unpack = unpack;

var errorHandler = function errorHandler(action) {
  return function (req, res) {
    action(req, res).catch(function (error) {
      console.log('ERROR', error);
      res.status(error.status).send(error.body);
    });
  };
};

exports.errorHandler = errorHandler;
//# sourceMappingURL=index.js.map