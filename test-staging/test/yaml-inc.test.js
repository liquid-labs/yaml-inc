"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var fsPath = _interopRequireWildcard(require("node:path"));
var _yamlInc = require("../yaml-inc");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* global describe expect test */

var simplePath = fsPath.join(__dirname, 'data', 'simple.yaml');
var expectedSimple = {
  foo: 'foo',
  bar: 'bar',
  list: [1, 2]
};
var includeSimplePath = fsPath.join(__dirname, 'data', 'include-simple.yaml');
var expectedIncludeSimple = Object.assign({
  baz: 'baz'
}, expectedSimple, {
  boo: 'boo'
});
var doubleIncludePath = fsPath.join(__dirname, 'data', 'double-include.yaml');
var expcetedDoubleInclude = Object.assign({
  third: 3
}, expectedIncludeSimple);
var absIncludePath = fsPath.join(__dirname, 'data', 'abs-include.yaml');
var expectedAbsInclude = Object.assign({
  abs: true
}, expectedSimple);
describe('yamlLoad', function () {
  test('loads a standard YAML file', function () {
    return expect((0, _yamlInc.loadYAML)(simplePath)).toEqual(expectedSimple);
  });
  test('processes a 1st level include', function () {
    return expect((0, _yamlInc.loadYAML)(includeSimplePath)).toEqual(expectedIncludeSimple);
  });
  test('handles nested includes', function () {
    return expect((0, _yamlInc.loadYAML)(doubleIncludePath)).toEqual(expcetedDoubleInclude);
  });
  test('handles absolute includes', function () {
    return expect((0, _yamlInc.loadYAML)(absIncludePath, {
      absRoot: __dirname
    })).toEqual(expectedAbsInclude);
  });
});
describe('yamlLoadAsync', function () {
  test('loads a standard YAML file', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = expect;
          _context.next = 3;
          return (0, _yamlInc.loadYAMLAsync)(simplePath);
        case 3:
          _context.t1 = _context.sent;
          return _context.abrupt("return", (0, _context.t0)(_context.t1).toEqual(expectedSimple));
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  test('processes a 1st level include', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = expect;
          _context2.next = 3;
          return (0, _yamlInc.loadYAMLAsync)(includeSimplePath);
        case 3:
          _context2.t1 = _context2.sent;
          return _context2.abrupt("return", (0, _context2.t0)(_context2.t1).toEqual(expectedIncludeSimple));
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  test('handles nested includes', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = expect;
          _context3.next = 3;
          return (0, _yamlInc.loadYAMLAsync)(doubleIncludePath);
        case 3:
          _context3.t1 = _context3.sent;
          return _context3.abrupt("return", (0, _context3.t0)(_context3.t1).toEqual(expcetedDoubleInclude));
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  test('handles absolute includes', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.t0 = expect;
          _context4.next = 3;
          return (0, _yamlInc.loadYAMLAsync)(absIncludePath, {
            absRoot: __dirname
          });
        case 3:
          _context4.t1 = _context4.sent;
          return _context4.abrupt("return", (0, _context4.t0)(_context4.t1).toEqual(expectedAbsInclude));
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmc1BhdGgiLCJfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCIsInJlcXVpcmUiLCJfeWFtbEluYyIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsIm5vZGVJbnRlcm9wIiwiV2Vha01hcCIsImNhY2hlQmFiZWxJbnRlcm9wIiwiY2FjaGVOb2RlSW50ZXJvcCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfdHlwZW9mIiwiY2FjaGUiLCJoYXMiLCJnZXQiLCJuZXdPYmoiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlc2MiLCJzZXQiLCJzaW1wbGVQYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImV4cGVjdGVkU2ltcGxlIiwiZm9vIiwiYmFyIiwibGlzdCIsImluY2x1ZGVTaW1wbGVQYXRoIiwiZXhwZWN0ZWRJbmNsdWRlU2ltcGxlIiwiYXNzaWduIiwiYmF6IiwiYm9vIiwiZG91YmxlSW5jbHVkZVBhdGgiLCJleHBjZXRlZERvdWJsZUluY2x1ZGUiLCJ0aGlyZCIsImFic0luY2x1ZGVQYXRoIiwiZXhwZWN0ZWRBYnNJbmNsdWRlIiwiYWJzIiwiZGVzY3JpYmUiLCJ0ZXN0IiwiZXhwZWN0IiwibG9hZFlBTUwiLCJ0b0VxdWFsIiwiYWJzUm9vdCIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsInQwIiwibG9hZFlBTUxBc3luYyIsInQxIiwic2VudCIsImFicnVwdCIsInN0b3AiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC95YW1sLWluYy50ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBkZXNjcmliZSBleHBlY3QgdGVzdCAqL1xuaW1wb3J0ICogYXMgZnNQYXRoIGZyb20gJ25vZGU6cGF0aCdcblxuaW1wb3J0IHsgbG9hZFlBTUwsIGxvYWRZQU1MQXN5bmMgfSBmcm9tICcuLi95YW1sLWluYydcblxuY29uc3Qgc2ltcGxlUGF0aCA9IGZzUGF0aC5qb2luKF9fZGlybmFtZSwgJ2RhdGEnLCAnc2ltcGxlLnlhbWwnKVxuY29uc3QgZXhwZWN0ZWRTaW1wbGUgPSB7XG4gIGZvbyAgOiAnZm9vJyxcbiAgYmFyICA6ICdiYXInLFxuICBsaXN0IDogWzEsIDJdXG59XG5cbmNvbnN0IGluY2x1ZGVTaW1wbGVQYXRoID0gZnNQYXRoLmpvaW4oX19kaXJuYW1lLCAnZGF0YScsICdpbmNsdWRlLXNpbXBsZS55YW1sJylcbmNvbnN0IGV4cGVjdGVkSW5jbHVkZVNpbXBsZSA9IE9iamVjdC5hc3NpZ24oeyBiYXogOiAnYmF6JyB9LCBleHBlY3RlZFNpbXBsZSwgeyBib28gOiAnYm9vJyB9KVxuXG5jb25zdCBkb3VibGVJbmNsdWRlUGF0aCA9IGZzUGF0aC5qb2luKF9fZGlybmFtZSwgJ2RhdGEnLCAnZG91YmxlLWluY2x1ZGUueWFtbCcpXG5jb25zdCBleHBjZXRlZERvdWJsZUluY2x1ZGUgPSBPYmplY3QuYXNzaWduKHsgdGhpcmQ6IDMgfSwgZXhwZWN0ZWRJbmNsdWRlU2ltcGxlKVxuXG5jb25zdCBhYnNJbmNsdWRlUGF0aCA9IGZzUGF0aC5qb2luKF9fZGlybmFtZSwgJ2RhdGEnLCAnYWJzLWluY2x1ZGUueWFtbCcpXG5jb25zdCBleHBlY3RlZEFic0luY2x1ZGUgPSBPYmplY3QuYXNzaWduKHsgYWJzOiB0cnVlIH0sIGV4cGVjdGVkU2ltcGxlKVxuXG5kZXNjcmliZSgneWFtbExvYWQnLCAoKSA9PiB7XG4gIHRlc3QoJ2xvYWRzIGEgc3RhbmRhcmQgWUFNTCBmaWxlJywgKCkgPT4gZXhwZWN0KGxvYWRZQU1MKHNpbXBsZVBhdGgpKS50b0VxdWFsKGV4cGVjdGVkU2ltcGxlKSlcblxuICB0ZXN0KCdwcm9jZXNzZXMgYSAxc3QgbGV2ZWwgaW5jbHVkZScsICgpID0+IGV4cGVjdChsb2FkWUFNTChpbmNsdWRlU2ltcGxlUGF0aCkpLnRvRXF1YWwoZXhwZWN0ZWRJbmNsdWRlU2ltcGxlKSlcblxuICB0ZXN0KCdoYW5kbGVzIG5lc3RlZCBpbmNsdWRlcycsICgpID0+IGV4cGVjdChsb2FkWUFNTChkb3VibGVJbmNsdWRlUGF0aCkpLnRvRXF1YWwoZXhwY2V0ZWREb3VibGVJbmNsdWRlKSlcblxuICB0ZXN0KCdoYW5kbGVzIGFic29sdXRlIGluY2x1ZGVzJywgKCkgPT4gZXhwZWN0KGxvYWRZQU1MKGFic0luY2x1ZGVQYXRoLCB7IGFic1Jvb3Q6IF9fZGlybmFtZSB9KSkudG9FcXVhbChleHBlY3RlZEFic0luY2x1ZGUpKVxufSlcblxuZGVzY3JpYmUoJ3lhbWxMb2FkQXN5bmMnLCAoKSA9PiB7XG4gIHRlc3QoJ2xvYWRzIGEgc3RhbmRhcmQgWUFNTCBmaWxlJywgYXN5bmMoKSA9PiBleHBlY3QoYXdhaXQgbG9hZFlBTUxBc3luYyhzaW1wbGVQYXRoKSkudG9FcXVhbChleHBlY3RlZFNpbXBsZSkpXG5cbiAgdGVzdCgncHJvY2Vzc2VzIGEgMXN0IGxldmVsIGluY2x1ZGUnLCBhc3luYygpID0+XG4gICAgZXhwZWN0KGF3YWl0IGxvYWRZQU1MQXN5bmMoaW5jbHVkZVNpbXBsZVBhdGgpKS50b0VxdWFsKGV4cGVjdGVkSW5jbHVkZVNpbXBsZSkpXG5cbiAgdGVzdCgnaGFuZGxlcyBuZXN0ZWQgaW5jbHVkZXMnLCBhc3luYygpID0+IFxuICAgIGV4cGVjdChhd2FpdCBsb2FkWUFNTEFzeW5jKGRvdWJsZUluY2x1ZGVQYXRoKSkudG9FcXVhbChleHBjZXRlZERvdWJsZUluY2x1ZGUpKVxuXG4gIHRlc3QoJ2hhbmRsZXMgYWJzb2x1dGUgaW5jbHVkZXMnLCBhc3luYygpID0+IFxuICAgIGV4cGVjdChhd2FpdCBsb2FkWUFNTEFzeW5jKGFic0luY2x1ZGVQYXRoLCB7IGFic1Jvb3Q6IF9fZGlybmFtZSB9KSkudG9FcXVhbChleHBlY3RlZEFic0luY2x1ZGUpKVxufSlcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBQUEsTUFBQSxHQUFBQyx1QkFBQSxDQUFBQyxPQUFBO0FBRUEsSUFBQUMsUUFBQSxHQUFBRCxPQUFBO0FBQXFELFNBQUFFLHlCQUFBQyxXQUFBLGVBQUFDLE9BQUEsa0NBQUFDLGlCQUFBLE9BQUFELE9BQUEsUUFBQUUsZ0JBQUEsT0FBQUYsT0FBQSxZQUFBRix3QkFBQSxZQUFBQSx5QkFBQUMsV0FBQSxXQUFBQSxXQUFBLEdBQUFHLGdCQUFBLEdBQUFELGlCQUFBLEtBQUFGLFdBQUE7QUFBQSxTQUFBSix3QkFBQVEsR0FBQSxFQUFBSixXQUFBLFNBQUFBLFdBQUEsSUFBQUksR0FBQSxJQUFBQSxHQUFBLENBQUFDLFVBQUEsV0FBQUQsR0FBQSxRQUFBQSxHQUFBLGFBQUFFLE9BQUEsQ0FBQUYsR0FBQSx5QkFBQUEsR0FBQSx1Q0FBQUEsR0FBQSxVQUFBRyxLQUFBLEdBQUFSLHdCQUFBLENBQUFDLFdBQUEsT0FBQU8sS0FBQSxJQUFBQSxLQUFBLENBQUFDLEdBQUEsQ0FBQUosR0FBQSxZQUFBRyxLQUFBLENBQUFFLEdBQUEsQ0FBQUwsR0FBQSxTQUFBTSxNQUFBLFdBQUFDLHFCQUFBLEdBQUFDLE1BQUEsQ0FBQUMsY0FBQSxJQUFBRCxNQUFBLENBQUFFLHdCQUFBLFdBQUFDLEdBQUEsSUFBQVgsR0FBQSxRQUFBVyxHQUFBLGtCQUFBSCxNQUFBLENBQUFJLFNBQUEsQ0FBQUMsY0FBQSxDQUFBQyxJQUFBLENBQUFkLEdBQUEsRUFBQVcsR0FBQSxTQUFBSSxJQUFBLEdBQUFSLHFCQUFBLEdBQUFDLE1BQUEsQ0FBQUUsd0JBQUEsQ0FBQVYsR0FBQSxFQUFBVyxHQUFBLGNBQUFJLElBQUEsS0FBQUEsSUFBQSxDQUFBVixHQUFBLElBQUFVLElBQUEsQ0FBQUMsR0FBQSxLQUFB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