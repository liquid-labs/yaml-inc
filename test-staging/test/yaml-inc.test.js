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
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmc1BhdGgiLCJfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCIsInJlcXVpcmUiLCJfeWFtbEluYyIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsIm5vZGVJbnRlcm9wIiwiV2Vha01hcCIsImNhY2hlQmFiZWxJbnRlcm9wIiwiY2FjaGVOb2RlSW50ZXJvcCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfdHlwZW9mIiwiY2FjaGUiLCJoYXMiLCJnZXQiLCJuZXdPYmoiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlc2MiLCJzZXQiLCJzaW1wbGVQYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImV4cGVjdGVkU2ltcGxlIiwiZm9vIiwiYmFyIiwibGlzdCIsImluY2x1ZGVTaW1wbGVQYXRoIiwiZXhwZWN0ZWRJbmNsdWRlU2ltcGxlIiwiYXNzaWduIiwiYmF6IiwiYm9vIiwiZGVzY3JpYmUiLCJ0ZXN0IiwiZXhwZWN0IiwibG9hZFlBTUwiLCJ0b0VxdWFsIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwidDAiLCJsb2FkWUFNTEFzeW5jIiwidDEiLCJzZW50IiwiYWJydXB0Iiwic3RvcCIsIl9jYWxsZWUyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3QveWFtbC1pbmMudGVzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgZGVzY3JpYmUgZXhwZWN0IHRlc3QgKi9cbmltcG9ydCAqIGFzIGZzUGF0aCBmcm9tICdub2RlOnBhdGgnXG5cbmltcG9ydCB7IGxvYWRZQU1MLCBsb2FkWUFNTEFzeW5jIH0gZnJvbSAnLi4veWFtbC1pbmMnXG5cbmNvbnN0IHNpbXBsZVBhdGggPSBmc1BhdGguam9pbihfX2Rpcm5hbWUsICdkYXRhJywgJ3NpbXBsZS55YW1sJylcbmNvbnN0IGV4cGVjdGVkU2ltcGxlID0ge1xuICBmb28gIDogJ2ZvbycsXG4gIGJhciAgOiAnYmFyJyxcbiAgbGlzdCA6IFsxLCAyXVxufVxuXG5jb25zdCBpbmNsdWRlU2ltcGxlUGF0aCA9IGZzUGF0aC5qb2luKF9fZGlybmFtZSwgJ2RhdGEnLCAnaW5jbHVkZS1zaW1wbGUueWFtbCcpXG5jb25zdCBleHBlY3RlZEluY2x1ZGVTaW1wbGUgPSBPYmplY3QuYXNzaWduKHsgYmF6IDogJ2JheicgfSwgZXhwZWN0ZWRTaW1wbGUsIHsgYm9vIDogJ2JvbycgfSlcblxuZGVzY3JpYmUoJ3lhbWxMb2FkJywgKCkgPT4ge1xuICB0ZXN0KCdsb2FkcyBhIHN0YW5kYXJkIFlBTUwgZmlsZScsICgpID0+IGV4cGVjdChsb2FkWUFNTChzaW1wbGVQYXRoKSkudG9FcXVhbChleHBlY3RlZFNpbXBsZSkpXG5cbiAgdGVzdCgncHJvY2Vzc2VzIGEgMXN0IGxldmVsIGluY2x1ZGUnLCAoKSA9PiBleHBlY3QobG9hZFlBTUwoaW5jbHVkZVNpbXBsZVBhdGgpKS50b0VxdWFsKGV4cGVjdGVkSW5jbHVkZVNpbXBsZSkpXG59KVxuXG5kZXNjcmliZSgneWFtbExvYWRBc3luYycsICgpID0+IHtcbiAgdGVzdCgnbG9hZHMgYSBzdGFuZGFyZCBZQU1MIGZpbGUnLCBhc3luYygpID0+IGV4cGVjdChhd2FpdCBsb2FkWUFNTEFzeW5jKHNpbXBsZVBhdGgpKS50b0VxdWFsKGV4cGVjdGVkU2ltcGxlKSlcblxuICB0ZXN0KCdwcm9jZXNzZXMgYSAxc3QgbGV2ZWwgaW5jbHVkZScsIGFzeW5jKCkgPT5cbiAgICBleHBlY3QoYXdhaXQgbG9hZFlBTUxBc3luYyhpbmNsdWRlU2ltcGxlUGF0aCkpLnRvRXF1YWwoZXhwZWN0ZWRJbmNsdWRlU2ltcGxlKSlcbn0pXG4iXSwibWFwcGluZ3MiOiI7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