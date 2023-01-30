"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = TodoContextProvider;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TodoContext = exports.TodoContext = _react2.default.createContext();

function TodoContextProvider(props) {
  var _useState = (0, _react.useState)({
    tasks: [],
    planKey: ""
  }),
      _useState2 = _slicedToArray(_useState, 2),
      todo = _useState2[0],
      setTodo = _useState2[1];

  var getTodo = function getTodo() {
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    setTodo(_extends({}, todo, {
      planKey: key
    }));
    _axios2.default.get("http://localhost:9001/todo/" + key).then(function (res) {
      setTodo(res.data);
    }).catch(function (err) {
      console.log(err);
    });
  };

  (0, _react.useEffect)(function () {
    if (props.user.auth) {
      getTodo();
    }
  }, [props.user.auth]);

  return _react2.default.createElement(
    TodoContext.Provider,
    {
      value: {
        todo: todo,
        setTodo: setTodo,
        getTodo: getTodo
      }
    },
    props.children
  );
}