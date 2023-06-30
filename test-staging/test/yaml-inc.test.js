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
describe('yamlLoad', function () {
  test('loads a standard YAML file', function () {
    return expect((0, _yamlInc.loadYAML)(simplePath)).toEqual(expectedSimple);
  });
  test('processes a 1st level include', function () {
    return expect((0, _yamlInc.loadYAML)(includeSimplePath)).toEqual(expectedIncludeSimple);
  });
});
describe('yamlLoadAsync', function () {
  test('loads a standard YAML file', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = expect;
          _context.next = 3;
          return (0, _yamlInc.loadYAML)(simplePath);
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
          return (0, _yamlInc.loadYAML)(includeSimplePath);
        case 3:
          _context2.t1 = _context2.sent;
          return _context2.abrupt("return", (0, _context2.t0)(_context2.t1).toEqual(expectedIncludeSimple));
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmc1BhdGgiLCJfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCIsInJlcXVpcmUiLCJfeWFtbEluYyIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsIm5vZGVJbnRlcm9wIiwiV2Vha01hcCIsImNhY2hlQmFiZWxJbnRlcm9wIiwiY2FjaGVOb2RlSW50ZXJvcCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfdHlwZW9mIiwiY2FjaGUiLCJoYXMiLCJnZXQiLCJuZXdPYmoiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlc2MiLCJzZXQiLCJzaW1wbGVQYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImV4cGVjdGVkU2ltcGxlIiwiZm9vIiwiYmFyIiwibGlzdCIsImluY2x1ZGVTaW1wbGVQYXRoIiwiZXhwZWN0ZWRJbmNsdWRlU2ltcGxlIiwiYXNzaWduIiwiYmF6IiwiYm9vIiwiZGVzY3JpYmUiLCJ0ZXN0IiwiZXhwZWN0IiwibG9hZFlBTUwiLCJ0b0VxdWFsIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwidDAiLCJ0MSIsInNlbnQiLCJhYnJ1cHQiLCJzdG9wIiwiX2NhbGxlZTIiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC95YW1sLWluYy50ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBkZXNjcmliZSBleHBlY3QgdGVzdCAqL1xuaW1wb3J0ICogYXMgZnNQYXRoIGZyb20gJ25vZGU6cGF0aCdcblxuaW1wb3J0IHsgbG9hZFlBTUwsIGxvYWRZQU1MQXN5bmMgfSBmcm9tICcuLi95YW1sLWluYydcblxuY29uc3Qgc2ltcGxlUGF0aCA9IGZzUGF0aC5qb2luKF9fZGlybmFtZSwgJ2RhdGEnLCAnc2ltcGxlLnlhbWwnKVxuY29uc3QgZXhwZWN0ZWRTaW1wbGUgPSB7XG4gIGZvbzogJ2ZvbycsXG4gIGJhcjogJ2JhcicsXG4gIGxpc3Q6IFsgMSwgMiBdXG59XG5cbmNvbnN0IGluY2x1ZGVTaW1wbGVQYXRoID0gZnNQYXRoLmpvaW4oX19kaXJuYW1lLCAnZGF0YScsICdpbmNsdWRlLXNpbXBsZS55YW1sJylcbmNvbnN0IGV4cGVjdGVkSW5jbHVkZVNpbXBsZSA9IE9iamVjdC5hc3NpZ24oeyBiYXo6ICdiYXonIH0sIGV4cGVjdGVkU2ltcGxlLCB7IGJvbzogJ2JvbycgfSlcblxuZGVzY3JpYmUoJ3lhbWxMb2FkJywgKCkgPT4ge1xuICB0ZXN0KCdsb2FkcyBhIHN0YW5kYXJkIFlBTUwgZmlsZScsICgpID0+IGV4cGVjdChsb2FkWUFNTChzaW1wbGVQYXRoKSkudG9FcXVhbChleHBlY3RlZFNpbXBsZSkpXG5cbiAgdGVzdCgncHJvY2Vzc2VzIGEgMXN0IGxldmVsIGluY2x1ZGUnLCAoKSA9PiBleHBlY3QobG9hZFlBTUwoaW5jbHVkZVNpbXBsZVBhdGgpKS50b0VxdWFsKGV4cGVjdGVkSW5jbHVkZVNpbXBsZSkpXG59KVxuXG5cbmRlc2NyaWJlKCd5YW1sTG9hZEFzeW5jJywgKCkgPT4ge1xuICB0ZXN0KCdsb2FkcyBhIHN0YW5kYXJkIFlBTUwgZmlsZScsIGFzeW5jKCkgPT4gZXhwZWN0KGF3YWl0IGxvYWRZQU1MKHNpbXBsZVBhdGgpKS50b0VxdWFsKGV4cGVjdGVkU2ltcGxlKSlcblxuICB0ZXN0KCdwcm9jZXNzZXMgYSAxc3QgbGV2ZWwgaW5jbHVkZScsIGFzeW5jKCkgPT5cbiAgICBleHBlY3QoYXdhaXQgbG9hZFlBTUwoaW5jbHVkZVNpbXBsZVBhdGgpKS50b0VxdWFsKGV4cGVjdGVkSW5jbHVkZVNpbXBsZSkpXG59KSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBQUEsTUFBQSxHQUFBQyx1QkFB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