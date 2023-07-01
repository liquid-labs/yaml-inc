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

/**
 * Loads a valid YAML file and processes '# include [path]` directives.`The path may be relative (to the including file) or absolute (relative to `options.absRoot`).
 *
 * @param `filePath` (string) The path to the root YAML file to load
 * @param `options.absRoot` (string) A directory path pre-pended to absolute include paths. Defaults to '/' (or system equivalent)
 * @return The processed data object
 */
var loadYAML = function loadYAML(filePath, options) {
  var contents = (0, _nodeFs.readFileSync)(filePath, {
    encoding: 'utf8'
  });
  var lines = processContents(contents, _objectSpread(_objectSpread({}, options), {}, {
    filePath: filePath
  }));
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
          lines = processContents(contents, _objectSpread(_objectSpread({}, options), {}, {
            filePath: filePath
          }));
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
        var includeLines = processContents(incContents, {
          absRoot: absRoot,
          filePath: includePath
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcyIsIl9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkIiwicmVxdWlyZSIsIl9ub2RlRnMiLCJmc1BhdGgiLCJfanNZYW1sIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsIm5vZGVJbnRlcm9wIiwiV2Vha01hcCIsImNhY2hlQmFiZWxJbnRlcm9wIiwiY2FjaGVOb2RlSW50ZXJvcCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfdHlwZW9mIiwiY2FjaGUiLCJoYXMiLCJnZXQiLCJuZXdPYmoiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlc2MiLCJzZXQiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJzdGVwIiwibmV4dCIsIl9lMiIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImZyb20iLCJ0ZXN0IiwiYXJyIiwibGVuIiwiYXJyMiIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJhcmd1bWVudHMiLCJzb3VyY2UiLCJmb3JFYWNoIiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiaW5jbHVkZVBhdGhSZSIsImxvYWRZQU1MIiwiZmlsZVBhdGgiLCJvcHRpb25zIiwiY29udGVudHMiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImxpbmVzIiwicHJvY2Vzc0NvbnRlbnRzIiwieWFtbCIsImxvYWQiLCJqb2luIiwiZXhwb3J0cyIsImxvYWRZQU1MQXN5bmMiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJyZWFkRmlsZSIsInNlbnQiLCJhYnJ1cHQiLCJzdG9wIiwiX3giLCJfeDIiLCJfcmVmMiIsIl9yZWYyJGFic1Jvb3QiLCJhYnNSb290Iiwic2VwIiwic3BsaXQiLCJwcm9jZXNzZWRMaW5lcyIsIl9pdGVyYXRvciIsIl9zdGVwIiwibGluZSIsInN0YXJ0c1dpdGgiLCJpbmNsdWRlUGF0aCIsIm1hdGNoIiwiZGlybmFtZSIsImluY0NvbnRlbnRzIiwiaW5jbHVkZUxpbmVzIiwiX3RvQ29uc3VtYWJsZUFycmF5MiJdLCJzb3VyY2VzIjpbIi4uL3NyYy95YW1sLWluYy5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSAnbm9kZTpmcy9wcm9taXNlcydcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgKiBhcyBmc1BhdGggZnJvbSAnbm9kZTpwYXRoJ1xuXG5pbXBvcnQgeWFtbCBmcm9tICdqcy15YW1sJ1xuXG5jb25zdCBpbmNsdWRlUGF0aFJlID0gLyMgaW5jbHVkZSAoLispL1xuXG4vKipcbiAqIExvYWRzIGEgdmFsaWQgWUFNTCBmaWxlIGFuZCBwcm9jZXNzZXMgJyMgaW5jbHVkZSBbcGF0aF1gIGRpcmVjdGl2ZXMuYFRoZSBwYXRoIG1heSBiZSByZWxhdGl2ZSAodG8gdGhlIGluY2x1ZGluZyBmaWxlKSBvciBhYnNvbHV0ZSAocmVsYXRpdmUgdG8gYG9wdGlvbnMuYWJzUm9vdGApLlxuICpcbiAqIEBwYXJhbSBgZmlsZVBhdGhgIChzdHJpbmcpIFRoZSBwYXRoIHRvIHRoZSByb290IFlBTUwgZmlsZSB0byBsb2FkXG4gKiBAcGFyYW0gYG9wdGlvbnMuYWJzUm9vdGAgKHN0cmluZykgQSBkaXJlY3RvcnkgcGF0aCBwcmUtcGVuZGVkIHRvIGFic29sdXRlIGluY2x1ZGUgcGF0aHMuIERlZmF1bHRzIHRvICcvJyAob3Igc3lzdGVtIGVxdWl2YWxlbnQpXG4gKiBAcmV0dXJuIFRoZSBwcm9jZXNzZWQgZGF0YSBvYmplY3RcbiAqL1xuY29uc3QgbG9hZFlBTUwgPSAoZmlsZVBhdGgsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgY29udGVudHMgPSByZWFkRmlsZVN5bmMoZmlsZVBhdGgsIHsgZW5jb2RpbmcgOiAndXRmOCcgfSlcbiAgY29uc3QgbGluZXMgPSBwcm9jZXNzQ29udGVudHMoY29udGVudHMsIHsgLi4ub3B0aW9ucywgZmlsZVBhdGggfSlcbiAgcmV0dXJuIHlhbWwubG9hZChsaW5lcy5qb2luKCdcXG4nKSlcbn1cblxuY29uc3QgbG9hZFlBTUxBc3luYyA9IGFzeW5jKGZpbGVQYXRoLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUoZmlsZVBhdGgsIHsgZW5jb2RpbmcgOiAndXRmOCcgfSlcbiAgY29uc3QgbGluZXMgPSBwcm9jZXNzQ29udGVudHMoY29udGVudHMsIHsgLi4ub3B0aW9ucywgZmlsZVBhdGggfSlcbiAgcmV0dXJuIHlhbWwubG9hZChsaW5lcy5qb2luKCdcXG4nKSlcbn1cblxuY29uc3QgcHJvY2Vzc0NvbnRlbnRzID0gKGNvbnRlbnRzLCB7IGFic1Jvb3QgPSBmc1BhdGguc2VwLCBmaWxlUGF0aCB9KSA9PiB7XG4gIGNvbnN0IGxpbmVzID0gY29udGVudHMuc3BsaXQoJ1xcbicpXG4gIGNvbnN0IHByb2Nlc3NlZExpbmVzID0gW11cbiAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgaWYgKGxpbmUuc3RhcnRzV2l0aCgnIyBpbmNsdWRlICcpKSB7XG4gICAgICBsZXQgaW5jbHVkZVBhdGggPSBsaW5lLm1hdGNoKGluY2x1ZGVQYXRoUmUpWzFdXG4gICAgICBpZiAoaW5jbHVkZVBhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgIGluY2x1ZGVQYXRoID0gZnNQYXRoLmpvaW4oYWJzUm9vdCwgaW5jbHVkZVBhdGguc2xpY2UoMSkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaW5jbHVkZVBhdGggPSBmc1BhdGguam9pbihmc1BhdGguZGlybmFtZShmaWxlUGF0aCksIGluY2x1ZGVQYXRoKVxuICAgICAgfVxuICAgICAgY29uc3QgaW5jQ29udGVudHMgPSByZWFkRmlsZVN5bmMoaW5jbHVkZVBhdGgsIHsgZW5jb2RpbmcgOiAndXRmOCcgfSlcblxuICAgICAgY29uc3QgaW5jbHVkZUxpbmVzID0gcHJvY2Vzc0NvbnRlbnRzKGluY0NvbnRlbnRzLCB7IGFic1Jvb3QsIGZpbGVQYXRoIDogaW5jbHVkZVBhdGggfSlcbiAgICAgIHByb2Nlc3NlZExpbmVzLnB1c2goLi4uaW5jbHVkZUxpbmVzKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHByb2Nlc3NlZExpbmVzLnB1c2gobGluZSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJvY2Vzc2VkTGluZXNcbn1cblxuZXhwb3J0IHsgbG9hZFlBTUwsIGxvYWRZQU1MQXN5bmMgfVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxFQUFBLEdBQUFDLHVCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxPQUFBLEdBQUFELE9BQUE7QUFDQSxJQUFBRSxNQUFBLEdBQUFILHVCQUFBLENBQUFDLE9BQUE7QUFFQSxJQUFBRyxPQUFBLEdBQUFDLHNCQUFBLENBQUFKLE9BQUE7QUFBMEIsU0FBQUsseUJBQUFDLFdBQUEsZUFBQUMsT0FBQSxrQ0FBQUMsaUJBQUEsT0FBQUQsT0FBQSxRQUFBRSxnQkFBQSxPQUFBRixPQUFBLFlBQUFGLHdCQUFBLFlBQUFBLHlCQUFBQyxXQUFBLFdBQUFBLFdBQUEsR0FBQUcsZ0JBQUEsR0FBQUQsaUJBQUEsS0FBQUYsV0FBQTtBQUFBLFNBQUFQLHdCQUFBVyxHQUFBLEVBQUFKLFdBQUEsU0FBQUEsV0FBQSxJQUFBSSxHQUFBLElBQUFBLEdBQUEsQ0FBQUMsVUFBQSxXQUFBRCxHQUFBLFFBQUFBLEdBQUEsYUFBQUUsT0FBQSxDQUFBRixHQUFBLHlCQUFBQSxHQUFBLHVDQUFBQSxHQUFBLFVBQUFHLEtBQUEsR0FBQVIsd0JBQUEsQ0FBQUMsV0FBQSxPQUFBTyxLQUFBLElBQUFBLEtBQUEsQ0FBQUMsR0FBQSxDQUFBSixHQUFBLFlBQUFHLEtBQUEsQ0FBQUUsR0FBQSxDQUFBTCxHQUFBLFNBQUFNLE1BQUEsV0FBQUMscUJBQUEsR0FBQUMsTUFBQSxDQUFBQyxjQUFBLElBQUFELE1BQUEsQ0FBQUUsd0JBQUEsV0FBQUMsR0FBQSxJQUFBWCxHQUFBLFFBQUFXLEdBQUEsa0JBQUFILE1BQUEsQ0FBQUksU0FBQSxDQUFBQyxjQUFBLENBQUFDLElBQUEsQ0FBQWQsR0FBQSxFQUFBVyxHQUFBLFNBQUFJLElBQUEsR0FBQVIscUJBQUEsR0FBQUMsTUFBQSxDQUFBRSx3QkFBQSxDQUFBVixHQUFBLEVBQUFXLEdBQUEsY0FBQUksSUFBQSxLQUFBQSxJQUFBLENBQUFWLEdBQUEsSUFBQVUsSUFBQSxDQUFBQyxHQUFBLEtBQUFSLE1BQUEsQ0FBQUMsY0FBQSxDQUFBSCxNQUFBLEVBQUFLLEdBQUEsRUFBQUksSUFBQSxZQUFBVCxNQUFBLENBQUFLLEdBQUEsSUFBQVgsR0FBQSxDQUFBVyxHQUFBLFNBQUFMLE1BQUEsY0FBQU4sR0FBQSxNQUFBRyxLQUFBLElBQUFBLEtBQUEsQ0FBQWEsR0FBQSxDQUFBaEIsR0FBQSxFQUFBTSxNQUFBLFlBQUFBLE1BQUE7QUFBQSxTQUFBVywyQkFBQUMsQ0FBQSxFQUFBQyxjQUFBLFFBQUFDLEVBQUEsVUFBQUMsTUFBQSxvQkFBQUgsQ0FBQSxDQUFBRyxNQUFBLENBQUFDLFFBQUEsS0FBQUosQ0FBQSxxQkFBQUUsRUFBQSxRQUFBRyxLQUFBLENBQUFDLE9BQUEsQ0FBQU4sQ0FBQSxNQUFBRSxFQUFBLEdBQUFLLDJCQUFBLENBQUFQLENBQUEsTUFBQUMsY0FBQSxJQUFBRCxDQUFBLFdBQUFBLENBQUEsQ0FBQVEsTUFBQSxxQkFBQU4sRUFBQSxFQUFBRixDQUFBLEdBQUFFLEVBQUEsTUFBQU8sQ0FBQSxVQUFBQyxDQUFBLFlBQUFBLEVBQUEsZUFBQUMsQ0FBQSxFQUFBRCxDQUFBLEVBQUFFLENBQUEsV0FBQUEsRUFBQSxRQUFBSCxDQUFBLElBQUFULENBQUEsQ0FBQVEsTUFBQSxXQUFBSyxJQUFBLG1CQUFBQSxJQUFBLFNBQUFDLEtBQUEsRUFBQWQsQ0FBQSxDQUFBUyxDQUFBLFVBQUFNLENBQUEsV0FBQUEsRUFBQUMsRUFBQSxVQUFBQSxFQUFBLEtBQUFDLENBQUEsRUFBQVAsQ0FBQSxnQkFBQVEsU0FBQSxpSkFBQUMsZ0JBQUEsU0FBQUMsTUFBQSxVQUFBQyxHQUFBLFdBQUFWLENBQUEsV0FBQUEsRUFBQSxJQUFBVCxFQUFBLEdBQUFBLEVBQUEsQ0FBQU4sSUFBQSxDQUFBSSxDQUFBLE1BQUFZLENBQUEsV0FBQUEsRUFBQSxRQUFBVSxJQUFBLEdBQUFwQixFQUFBLENBQUFxQixJQUFBLElBQUFKLGdCQUFBLEdBQUFHLElBQUEsQ0FBQVQsSUFBQSxTQUFBUyxJQUFBLEtBQUFQLENBQUEsV0FBQUEsRUFBQVMsR0FBQSxJQUFBSixNQUFBLFNBQUFDLEdBQUEsR0FBQUcsR0FBQSxLQUFBUCxDQUFBLFdBQUFBLEVBQUEsZUFBQUUsZ0JBQUEsSUFBQWpCLEVBQUEsb0JBQUFBLEVBQUEsOEJBQUFrQixNQUFBLFFBQUFDLEdBQUE7QUFBQSxTQUFBZCw0QkFBQVAsQ0FBQSxFQUFBeUIsTUFBQSxTQUFBekIsQ0FBQSxxQkFBQUEsQ0FBQSxzQkFBQTBCLGlCQUFBLENBQUExQixDQUFBLEVBQUF5QixNQUFBLE9BQUFiLENBQUEsR0FBQXRCLE1BQUEsQ0FBQUksU0FBQSxDQUFBaUMsUUFBQSxDQUFBL0IsSUFBQSxDQUFBSSxDQUFBLEVBQUE0QixLQUFBLGFBQUFoQixDQUFBLGlCQUFBWixDQUFBLENBQUE2QixXQUFBLEVBQUFqQixDQUFBLEdBQUFaLENBQUEsQ0FBQTZCLFdBQUEsQ0FBQUMsSUFBQSxNQUFBbEIsQ0FBQSxjQUFBQSxDQUFBLG1CQUFBUCxLQUFBLENBQUEwQixJQUFBLENBQUEvQixDQUFBLE9BQUFZLENBQUEsK0RBQUFvQixJQUFBLENBQUFwQixDQUFBLFVBQUFjLGlCQUFBLENBQUExQixDQUFBLEVBQUF5QixNQUFBO0FBQUEsU0FBQUMsa0JBQUFPLEdBQUEsRUFBQUMsR0FBQSxRQUFBQSxHQUFBLFlBQUFBLEdBQUEsR0FBQUQsR0FBQSxDQUFBekIsTUFBQSxFQUFBMEIsR0FBQSxHQUFBRCxHQUFBLENBQUF6QixNQUFBLFdBQUFDLENBQUEsTUFBQTBCLElBQUEsT0FBQTlCLEtBQUEsQ0FBQTZCLEdBQUEsR0FBQXpCLENBQUEsR0FBQXlCLEdBQUEsRUFBQXpCLENBQUEsSUFBQTBCLElBQUEsQ0FBQTFCLENBQUEsSUFBQXdCLEdBQUEsQ0FBQXhCLENBQUEsVUFBQTBCLElBQUE7QUFBQSxTQUFBQyxRQUFBQyxNQUFBLEVBQUFDLGNBQUEsUUFBQUMsSUFBQSxHQUFBakQsTUFBQSxDQUFBaUQsSUFBQSxDQUFBRixNQUFBLE9BQUEvQyxNQUFBLENBQUFrRCxxQkFBQSxRQUFBQyxPQUFBLEdBQUFuRCxNQUFBLENBQUFrRCxxQkFBQSxDQUFBSCxNQUFBLEdBQUFDLGNBQUEsS0FBQUcsT0FBQSxHQUFBQSxPQUFBLENBQUFDLE1BQUEsV0FBQUMsR0FBQSxXQUFBckQsTUFBQSxDQUFBRSx3QkFBQSxDQUFBNkMsTUFBQSxFQUFBTSxHQUFBLEVBQUFDLFVBQUEsT0FBQUwsSUFBQSxDQUFBTSxJQUFBLENBQUFDLEtBQUEsQ0FBQVAsSUFBQSxFQUFBRSxPQUFBLFlBQUFGLElBQUE7QUFBQSxTQUFBUSxjQUFBQyxNQUFBLGFBQUF2QyxDQUFBLE1BQUFBLENBQUEsR0FBQXdDLFNBQUEsQ0FBQXpDLE1BQUEsRUFBQUMsQ0FBQSxVQUFBeUMsTUFBQSxXQUFBRCxTQUFBLENBQUF4QyxDQUFBLElBQUF3QyxTQUFBLENBQUF4QyxDQUFBLFFBQUFBLENBQUEsT0FBQTJCLE9BQUEsQ0FBQTlDLE1BQUEsQ0FBQTRELE1BQUEsT0FBQUMsT0FBQSxXQUFBMUQsR0FBQSxRQUFBMkQsZ0JBQUEsYUFBQUosTUFBQSxFQUFBdkQsR0FBQSxFQUFBeUQsTUFBQSxDQUFBekQsR0FBQSxTQUFBSCxNQUFBLENBQUErRCx5QkFBQSxHQUFBL0QsTUFBQSxDQUFBZ0UsZ0JBQUEsQ0FBQU4sTUFBQSxFQUFBMUQsTUFBQSxDQUFBK0QseUJBQUEsQ0FBQUgsTUFBQSxLQUFBZCxPQUFBLENBQUE5QyxNQUFBLENBQUE0RCxNQUFBLEdBQUFDLE9BQUEsV0FBQTFELEdBQUEsSUFBQUgsTUFBQSxDQUFBQyxjQUFBLENBQUF5RCxNQUFBLEVBQUF2RCxHQUFBLEVBQUFILE1BQUEsQ0FBQUUsd0JBQUEsQ0FBQTBELE1BQUEsRUFBQXpELEdBQUEsaUJBQUF1RCxNQUFBO0FBRTFCLElBQU1PLGFBQWEsR0FBRyxnQkFBZ0I7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUMsUUFBUSxHQUFHLFNBQVhBLFFBQVFBLENBQUlDLFFBQVEsRUFBRUMsT0FBTyxFQUFLO0VBQ3RDLElBQU1DLFFBQVEsR0FBRyxJQUFBQyxvQkFBWSxFQUFDSCxRQUFRLEVBQUU7SUFBRUksUUFBUSxFQUFHO0VBQU8sQ0FBQyxDQUFDO0VBQzlELElBQU1DLEtBQUssR0FBR0MsZUFBZSxDQUFDSixRQUFRLEVBQUFaLGFBQUEsQ0FBQUEsYUFBQSxLQUFPVyxPQUFPO0lBQUVELFFBQVEsRUFBUkE7RUFBUSxFQUFFLENBQUM7RUFDakUsT0FBT08sa0JBQUksQ0FBQ0MsSUFBSSxDQUFDSCxLQUFLLENBQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBQUFDLE9BQUEsQ0FBQVgsUUFBQSxHQUFBQSxRQUFBO0FBRUQsSUFBTVksYUFBYTtFQUFBLElBQUFDLElBQUEsT0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUFHLFNBQUFDLFFBQU1oQixRQUFRLEVBQUVDLE9BQU87SUFBQSxJQUFBQyxRQUFBLEVBQUFHLEtBQUE7SUFBQSxPQUFBUyxZQUFBLFlBQUFHLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtNQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBckQsSUFBQTtRQUFBO1VBQUFxRCxRQUFBLENBQUFyRCxJQUFBO1VBQUEsT0FDcEJyRCxFQUFFLENBQUM0RyxRQUFRLENBQUNyQixRQUFRLEVBQUU7WUFBRUksUUFBUSxFQUFHO1VBQU8sQ0FBQyxDQUFDO1FBQUE7VUFBN0RGLFFBQVEsR0FBQWlCLFFBQUEsQ0FBQUcsSUFBQTtVQUNSakIsS0FBSyxHQUFHQyxlQUFlLENBQUNKLFFBQVEsRUFBQVosYUFBQSxDQUFBQSxhQUFBLEtBQU9XLE9BQU87WUFBRUQsUUFBUSxFQUFSQTtVQUFRLEVBQUUsQ0FBQztVQUFBLE9BQUFtQixRQUFBLENBQUFJLE1BQUEsV0FDMURoQixrQkFBSSxDQUFDQyxJQUFJLENBQUNILEtBQUssQ0FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUE7UUFBQTtVQUFBLE9BQUFVLFFBQUEsQ0FBQUssSUFBQTtNQUFBO0lBQUEsR0FBQVIsT0FBQTtFQUFBLENBQ25DO0VBQUEsZ0JBSktMLGFBQWFBLENBQUFjLEVBQUEsRUFBQUMsR0FBQTtJQUFBLE9BQUFkLElBQUEsQ0FBQXZCLEtBQUEsT0FBQUcsU0FBQTtFQUFBO0FBQUEsR0FJbEI7QUFBQWtCLE9BQUEsQ0FBQUMsYUFBQSxHQUFBQSxhQUFBO0FBRUQsSUFBTUwsZUFBZSxHQUFHLFNBQWxCQSxlQUFlQSxDQUFJSixRQUFRLEVBQUF5QixLQUFBLEVBQXlDO0VBQUEsSUFBQUMsYUFBQSxHQUFBRCxLQUFBLENBQXJDRSxPQUFPO0lBQVBBLE9BQU8sR0FBQUQsYUFBQSxjQUFHL0csTUFBTSxDQUFDaUgsR0FBRyxHQUFBRixhQUFBO0lBQUU1QixRQUFRLEdBQUEyQixLQUFBLENBQVIzQixRQUFRO0VBQ2pFLElBQU1LLEtBQUssR0FBR0gsUUFBUSxDQUFDNkIsS0FBSyxDQUFDLElBQUksQ0FBQztFQUNsQyxJQUFNQyxjQUFjLEdBQUcsRUFBRTtFQUFBLElBQUFDLFNBQUEsR0FBQTNGLDBCQUFBLENBQ04rRCxLQUFLO0lBQUE2QixLQUFBO0VBQUE7SUFBeEIsS0FBQUQsU0FBQSxDQUFBL0UsQ0FBQSxNQUFBZ0YsS0FBQSxHQUFBRCxTQUFBLENBQUE5RSxDQUFBLElBQUFDLElBQUEsR0FBMEI7TUFBQSxJQUFmK0UsSUFBSSxHQUFBRCxLQUFBLENBQUE3RSxLQUFBO01BQ2IsSUFBSThFLElBQUksQ0FBQ0MsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ2pDLElBQUlDLFdBQVcsR0FBR0YsSUFBSSxDQUFDRyxLQUFLLENBQUN4QyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSXVDLFdBQVcsQ0FBQ0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1VBQy9CQyxXQUFXLEdBQUd4SCxNQUFNLENBQUM0RixJQUFJLENBQUNvQixPQUFPLEVBQUVRLFdBQVcsQ0FBQ2xFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDLE1BQ0k7VUFDSGtFLFdBQVcsR0FBR3hILE1BQU0sQ0FBQzRGLElBQUksQ0FBQzVGLE1BQU0sQ0FBQzBILE9BQU8sQ0FBQ3ZDLFFBQVEsQ0FBQyxFQUFFcUMsV0FBVyxDQUFDO1FBQ2xFO1FBQ0EsSUFBTUcsV0FBVyxHQUFHLElBQUFyQyxvQkFBWSxFQUFDa0MsV0FBVyxFQUFFO1VBQUVqQyxRQUFRLEVBQUc7UUFBTyxDQUFDLENBQUM7UUFFcEUsSUFBTXFDLFlBQVksR0FBR25DLGVBQWUsQ0FBQ2tDLFdBQVcsRUFBRTtVQUFFWCxPQUFPLEVBQVBBLE9BQU87VUFBRTdCLFFBQVEsRUFBR3FDO1FBQVksQ0FBQyxDQUFDO1FBQ3RGTCxjQUFjLENBQUM1QyxJQUFJLENBQUFDLEtBQUEsQ0FBbkIyQyxjQUFjLE1BQUFVLG1CQUFBLGFBQVNELFlBQVksRUFBQztNQUN0QyxDQUFDLE1BQ0k7UUFDSFQsY0FBYyxDQUFDNUMsSUFBSSxDQUFDK0MsSUFBSSxDQUFDO01BQzNCO0lBQ0Y7RUFBQyxTQUFBdkUsR0FBQTtJQUFBcUUsU0FBQSxDQUFBM0UsQ0FBQSxDQUFBTSxHQUFBO0VBQUE7SUFBQXFFLFNBQUEsQ0FBQXpFLENBQUE7RUFBQTtFQUVELE9BQU93RSxjQUFjO0FBQ3ZCLENBQUMifQ==