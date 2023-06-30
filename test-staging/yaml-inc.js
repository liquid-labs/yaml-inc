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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcyIsIl9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkIiwicmVxdWlyZSIsIl9ub2RlRnMiLCJmc1BhdGgiLCJfanNZYW1sIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsIm5vZGVJbnRlcm9wIiwiV2Vha01hcCIsImNhY2hlQmFiZWxJbnRlcm9wIiwiY2FjaGVOb2RlSW50ZXJvcCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJfdHlwZW9mIiwiY2FjaGUiLCJoYXMiLCJnZXQiLCJuZXdPYmoiLCJoYXNQcm9wZXJ0eURlc2NyaXB0b3IiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImRlc2MiLCJzZXQiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJzdGVwIiwibmV4dCIsIl9lMiIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImZyb20iLCJ0ZXN0IiwiYXJyIiwibGVuIiwiYXJyMiIsIm93bktleXMiLCJvYmplY3QiLCJlbnVtZXJhYmxlT25seSIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJzeW1ib2xzIiwiZmlsdGVyIiwic3ltIiwiZW51bWVyYWJsZSIsInB1c2giLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJhcmd1bWVudHMiLCJzb3VyY2UiLCJmb3JFYWNoIiwiX2RlZmluZVByb3BlcnR5MiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiaW5jbHVkZVBhdGhSZSIsImxvYWRZQU1MIiwiZmlsZVBhdGgiLCJvcHRpb25zIiwiY29udGVudHMiLCJyZWFkRmlsZVN5bmMiLCJlbmNvZGluZyIsImxpbmVzIiwicHJvY2Vzc0NvbnRlbnRzIiwieWFtbCIsImxvYWQiLCJqb2luIiwiZXhwb3J0cyIsImxvYWRZQU1MQXN5bmMiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJyZWFkRmlsZSIsInNlbnQiLCJhYnJ1cHQiLCJzdG9wIiwiX3giLCJfeDIiLCJfcmVmMiIsIl9yZWYyJGFic1Jvb3QiLCJhYnNSb290Iiwic2VwIiwic3BsaXQiLCJwcm9jZXNzZWRMaW5lcyIsIl9pdGVyYXRvciIsIl9zdGVwIiwibGluZSIsInN0YXJ0c1dpdGgiLCJpbmNsdWRlUGF0aCIsIm1hdGNoIiwiZGlybmFtZSIsImluY0NvbnRlbnRzIiwiaW5jRGlyIiwiaW5jbHVkZUxpbmVzIiwiX3RvQ29uc3VtYWJsZUFycmF5MiJdLCJzb3VyY2VzIjpbIi4uL3NyYy95YW1sLWluYy5tanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSAnbm9kZTpmcy9wcm9taXNlcydcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ25vZGU6ZnMnXG5pbXBvcnQgKiBhcyBmc1BhdGggZnJvbSAnbm9kZTpwYXRoJ1xuXG5pbXBvcnQgeWFtbCBmcm9tICdqcy15YW1sJ1xuXG5jb25zdCBpbmNsdWRlUGF0aFJlID0gLyMgaW5jbHVkZSAoLispL1xuXG4vKipcbiAqIExvYWRzIGEgdmFsaWQgWUFNTCBmaWxlIGFuZCBwcm9jZXNzZXMgJyMgaW5jbHVkZSBbcGF0aF1gIGRpcmVjdGl2ZXMuYFRoZSBwYXRoIG1heSBiZSByZWxhdGl2ZSAodG8gdGhlIGluY2x1ZGluZyBmaWxlKSBvciBhYnNvbHV0ZSAocmVsYXRpdmUgdG8gYG9wdGlvbnMuYWJzUm9vdGApLlxuICogXG4gKiBAcGFyYW0gYGZpbGVQYXRoYCAoc3RyaW5nKSBUaGUgcGF0aCB0byB0aGUgcm9vdCBZQU1MIGZpbGUgdG8gbG9hZFxuICogQHBhcmFtIGBvcHRpb25zLmFic1Jvb3RgIChzdHJpbmcpIEEgZGlyZWN0b3J5IHBhdGggcHJlLXBlbmRlZCB0byBhYnNvbHV0ZSBpbmNsdWRlIHBhdGhzLiBEZWZhdWx0cyB0byAnLycgKG9yIHN5c3RlbSBlcXVpdmFsZW50KVxuICogQHJldHVybiBUaGUgcHJvY2Vzc2VkIGRhdGEgb2JqZWN0XG4gKi9cbmNvbnN0IGxvYWRZQU1MID0gKGZpbGVQYXRoLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnRzID0gcmVhZEZpbGVTeW5jKGZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSlcbiAgY29uc3QgbGluZXMgPSBwcm9jZXNzQ29udGVudHMoY29udGVudHMsIHsgLi4ub3B0aW9ucywgZmlsZVBhdGggfSlcbiAgcmV0dXJuIHlhbWwubG9hZChsaW5lcy5qb2luKCdcXG4nKSlcbn1cblxuY29uc3QgbG9hZFlBTUxBc3luYyA9IGFzeW5jKGZpbGVQYXRoLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnRzID0gYXdhaXQgZnMucmVhZEZpbGUoZmlsZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KVxuICBjb25zdCBsaW5lcyA9IHByb2Nlc3NDb250ZW50cyhjb250ZW50cywgeyAuLi5vcHRpb25zLCBmaWxlUGF0aCB9KVxuICByZXR1cm4geWFtbC5sb2FkKGxpbmVzLmpvaW4oJ1xcbicpKVxufVxuXG5jb25zdCBwcm9jZXNzQ29udGVudHMgPSAoY29udGVudHMsIHsgYWJzUm9vdCA9IGZzUGF0aC5zZXAsIGZpbGVQYXRoIH0pID0+IHtcbiAgY29uc3QgbGluZXMgPSBjb250ZW50cy5zcGxpdCgnXFxuJylcbiAgY29uc3QgcHJvY2Vzc2VkTGluZXMgPSBbXVxuICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCcjIGluY2x1ZGUgJykpIHtcbiAgICAgIGxldCBpbmNsdWRlUGF0aCA9IGxpbmUubWF0Y2goaW5jbHVkZVBhdGhSZSlbMV1cbiAgICAgIGlmIChpbmNsdWRlUGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgaW5jbHVkZVBhdGggPSBmc1BhdGguam9pbihhYnNSb290LCBpbmNsdWRlUGF0aC5zbGljZSgxKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpbmNsdWRlUGF0aCA9IGZzUGF0aC5qb2luKGZzUGF0aC5kaXJuYW1lKGZpbGVQYXRoKSwgaW5jbHVkZVBhdGgpXG4gICAgICB9XG4gICAgICBjb25zdCBpbmNDb250ZW50cyA9IHJlYWRGaWxlU3luYyhpbmNsdWRlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pXG4gICAgICBjb25zdCBpbmNEaXIgPSBmc1BhdGguZGlybmFtZShpbmNsdWRlUGF0aClcblxuICAgICAgY29uc3QgaW5jbHVkZUxpbmVzID0gcHJvY2Vzc0NvbnRlbnRzKGluY0NvbnRlbnRzLCB7IGFic1Jvb3QsIGZpbGVQYXRoOiBpbmNEaXIgfSlcbiAgICAgIHByb2Nlc3NlZExpbmVzLnB1c2goLi4uaW5jbHVkZUxpbmVzKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHByb2Nlc3NlZExpbmVzLnB1c2gobGluZSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcHJvY2Vzc2VkTGluZXNcbn1cblxuZXhwb3J0IHsgbG9hZFlBTUwsIGxvYWRZQU1MQXN5bmMgfSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsRUFBQSxHQUFBQyx1QkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsT0FBQSxHQUFBRCxPQUFBO0FBQ0EsSUFBQUUsTUFBQSxHQUFBSCx1QkFBQSxD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