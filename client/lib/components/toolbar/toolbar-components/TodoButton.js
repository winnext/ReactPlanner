"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TodoButton;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _material = require("@mui/material");

var _fa = require("react-icons/fa");

var _Context = require("../../../Context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TodoButton() {
  var todoContext = _react2.default.useContext(_Context.TodoContext);
  return _react2.default.createElement(
    _material.Badge,
    {
      style: { marginBottom: "8px" },
      badgeContent: todoContext.todo.tasks.length,
      color: "primary"
    },
    _react2.default.createElement(_fa.FaList, null)
  );
}