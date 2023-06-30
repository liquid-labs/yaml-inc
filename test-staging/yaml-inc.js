"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadYAMLAsync = exports.loadYAML = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var fs = _interopRequireWildcard(require("node:fs/promises"));
var _nodeFs = require("node:fs");
var fsPath = _interopRequireWildcard(require("node:path"));
var _jsYaml = _interopRequireDefault(require("js-yaml"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var includePathRe = /# include (.+)/;
var loadYAML = function loadYAML(filePath, options) {
  var contents = (0, _nodeFs.readFileSync)(filePath, {
    encoding: 'utf8'
  });
  var lines = processContents(contents, _objectSpread({
    filePath: filePath
  }, options));
  return _jsYaml["default"].load(lines.join('\n'));
};
exports.loadYAML = loadYAML;
var loadYAMLAsync = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filePath, options) {
    var contents, lines;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fs.readFile(filePath, {
            encoding: 'utf8'
          });
        case 2:
          contents = _context.sent;
          lines = processContents(contents, _objectSpread({
            filePath: filePath
          }, options));
          return _context.abrupt("return", _jsYaml["default"].load(lines.join('\n')));
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function loadYAMLAsync(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.loadYAMLAsync = loadYAMLAsync;
var processContents = function processContents(contents, _ref2) {
  var _ref2$absRoot = _ref2.absRoot,
    absRoot = _ref2$absRoot === void 0 ? fsPath.sep : _ref2$absRoot,
    filePath = _ref2.filePath;
  var lines = contents.split('\n');
  var processedLines = [];
  var _iterator = _createForOfIteratorHelper(lines),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var line = _step.value;
      if (line.startsWith('# include ')) {
        var includePath = line.match(includePathRe)[1];
        if (includePath.startsWith('/')) {
          includePath = fsPath.join(absRoot, includePath.slice(1));
        } else {
          includePath = fsPath.join(fsPath.dirname(filePath), includePath);
        }
        var incContents = (0, _nodeFs.readFileSync)(includePath, {
          encoding: 'utf8'
        });
        var incDir = fsPath.dirname(includePath);
        var includeLines = processContents(incContents, {
          absRoot: absRoot,
          filePath: incDir
        });
        processedLines.push.apply(processedLines, (0, _toConsumableArray2["default"])(includeLines));
      } else {
        processedLines.push(line);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return processedLines;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcyIsIl9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkIiwicmVxdWlyZSIsIl9ub2RlRnMiLCJmc1BhdGgiLCJfanNZYW1sIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsIm5vZGVJbnRlcm9wIiwiV2Vha01hcCIsImNhY2hlQmFiZWxJbnRlcm9wIiwiY2FjaGVOb2RlSW50ZXJvcCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfdHlwZW9mIiwiY2FjaGUiLCJoYXMiLCJnZXQiLCJuZXdPYmoiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlc2MiLCJzZXQiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJzdGVwIiwibmV4dCIsIl9lMiIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImZyb20iLCJ0ZXN0IiwiYXJyIiwibGVuIiwiYXJyMiIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJhcmd1bWVudHMiLCJzb3VyY2UiLCJmb3JFYWNoIiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiaW5jbHVkZVBhdGhSZSIsImxvYWRZQU1MIiwiZmlsZVBhdGgiLCJvcHRpb25zIiwiY29udGVudHMiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImxpbmVzIiwicHJvY2Vzc0NvbnRlbnRzIiwieWFtbCIsImxvYWQiLCJqb2luIiwiZXhwb3J0cyIsImxvYWRZQU1MQXN5bmMiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJyZWFkRmlsZSIsInNlbnQiLCJhYnJ1cHQiLCJzdG9wIiwiX3giLCJfeDIiLCJfcmVmMiIsIl9yZWYyJGFic1Jvb3QiLCJhYnNSb290Iiwic2VwIiwic3BsaXQiLCJwcm9jZXNzZWRMaW5lcyIsIl9pdGVyYXRvciIsIl9zdGVwIiwibGluZSIsInN0YXJ0c1dpdGgiLCJpbmNsdWRlUGF0aCIsIm1hdGNoIiwiZGlybmFtZSIsImluY0NvbnRlbnRzIiwiaW5jRGlyIiwiaW5jbHVkZUxpbmVzIiwiX3RvQ29uc3VtYWJsZUFycmF5MiJdLCJzb3VyY2VzIjpbIi4uL3NyYy95YW1sLWluYy5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSAnbm9kZTpmcy9wcm9taXNlcydcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgKiBhcyBmc1BhdGggZnJvbSAnbm9kZTpwYXRoJ1xuXG5pbXBvcnQgeWFtbCBmcm9tICdqcy15YW1sJ1xuXG5jb25zdCBpbmNsdWRlUGF0aFJlID0gLyMgaW5jbHVkZSAoLispL1xuXG5jb25zdCBsb2FkWUFNTCA9IChmaWxlUGF0aCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBjb250ZW50cyA9IHJlYWRGaWxlU3luYyhmaWxlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pXG4gIGNvbnN0IGxpbmVzID0gcHJvY2Vzc0NvbnRlbnRzKGNvbnRlbnRzLCB7IGZpbGVQYXRoLCAuLi5vcHRpb25zIH0pXG4gIHJldHVybiB5YW1sLmxvYWQobGluZXMuam9pbignXFxuJykpXG59XG5cbmNvbnN0IGxvYWRZQU1MQXN5bmMgPSBhc3luYyhmaWxlUGF0aCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBjb250ZW50cyA9IGF3YWl0IGZzLnJlYWRGaWxlKGZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSlcbiAgY29uc3QgbGluZXMgPSBwcm9jZXNzQ29udGVudHMoY29udGVudHMsIHsgZmlsZVBhdGgsIC4uLm9wdGlvbnMgfSlcbiAgcmV0dXJuIHlhbWwubG9hZChsaW5lcy5qb2luKCdcXG4nKSlcbn1cblxuY29uc3QgcHJvY2Vzc0NvbnRlbnRzID0gKGNvbnRlbnRzLCB7IGFic1Jvb3QgPSBmc1BhdGguc2VwLCBmaWxlUGF0aCB9KSA9PiB7XG4gIGNvbnN0IGxpbmVzID0gY29udGVudHMuc3BsaXQoJ1xcbicpXG4gIGNvbnN0IHByb2Nlc3NlZExpbmVzID0gW11cbiAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnIyBpbmNsdWRlICcpKSB7XG4gICAgICBsZXQgaW5jbHVkZVBhdGggPSBsaW5lLm1hdGNoKGluY2x1ZGVQYXRoUmUpWzFdXG4gICAgICBpZiAoaW5jbHVkZVBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgIGluY2x1ZGVQYXRoID0gZnNQYXRoLmpvaW4oYWJzUm9vdCwgaW5jbHVkZVBhdGguc2xpY2UoMSkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaW5jbHVkZVBhdGggPSBmc1BhdGguam9pbihmc1BhdGguZGlybmFtZShmaWxlUGF0aCksIGluY2x1ZGVQYXRoKVxuICAgICAgfVxuICAgICAgY29uc3QgaW5jQ29udGVudHMgPSByZWFkRmlsZVN5bmMoaW5jbHVkZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuICAgICAgY29uc3QgaW5jRGlyID0gZnNQYXRoLmRpcm5hbWUoaW5jbHVkZVBhdGgpXG5cbiAgICAgIGNvbnN0IGluY2x1ZGVMaW5lcyA9IHByb2Nlc3NDb250ZW50cyhpbmNDb250ZW50cywgeyBhYnNSb290LCBmaWxlUGF0aDogaW5jRGlyIH0pXG4gICAgICBwcm9jZXNzZWRMaW5lcy5wdXNoKC4uLmluY2x1ZGVMaW5lcylcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9jZXNzZWRMaW5lcy5wdXNoKGxpbmUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHByb2Nlc3NlZExpbmVzXG59XG5cbmV4cG9ydCB7IGxvYWRZQU1MLCBsb2FkWUFNTEFzeW5jIH0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLEVBQUEsR0FBQUMsdUJBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLE1BQUEsR0FBQUgsdUJBQUEsQ0FBQUMsT0FBQTtBQUVBLElBQUFHLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUosT0FBQTtBQUEwQixTQUFBSyx5QkFBQUMsV0FBQSxlQUFBQyxPQUFBLGtDQUFBQyxpQkFBQSxPQUFBRCxPQUFBLFFBQUFFLGdCQUFBLE9BQUFGLE9BQUEsWUFBQUYsd0JBQUEsWUFBQUEseUJBQUFDLFdBQUEsV0FBQUEsV0FBQSxHQUFBRyxnQkFBQSxHQUFBRCxpQkFBQSxLQUFBRixXQUFBO0FBQUEsU0FBQVAsd0JBQUFXLEdBQUEsRUFBQUosV0FBQSxTQUFBQSxXQUFBLElBQUFJLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLFdBQUFELEdBQUEsUUFBQUEsR0FBQSxhQUFBRSxPQUFBLENBQUFGLEdBQUEseUJBQUFBLEdBQUEsdUNBQUFBLEdBQUEsVUFBQUcsS0FBQSxHQUFBUix3QkFBQSxDQUFBQyxXQUFBLE9BQUFPLEtBQUEsSUFBQUEsS0FBQSxDQUFBQyxHQUFBLENB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