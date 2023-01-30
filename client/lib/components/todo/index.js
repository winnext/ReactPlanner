"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Todo;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require("../style/export");

var _material = require("@mui/material");

var _Context = require("../../Context");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Todo(props, context) {
  var width = props.width,
      height = props.height;
  var projectActions = context.projectActions,
      translator = context.translator;

  var _React$useState = _react2.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loadingCheck = _React$useState2[0],
      setLoadingCheck = _React$useState2[1];

  var todoContext = _react2.default.useContext(_Context.TodoContext);

  var Check = function Check() {
    setLoadingCheck(true);
    _axios2.default.post("http://localhost:9001/todo/check", {
      planKey: todoContext.todo.planKey
    }).then(function () {
      _axios2.default.post("http://localhost:9001/todo/check", {
        planKey: todoContext.todo.planKey
      }).then(function (res) {
        todoContext.setTodo(res.data);
        setLoadingCheck(false);
      }).catch(function (err) {
        console.log(err);
        setLoadingCheck(false);
      });
    }).catch(function (err) {
      console.log(err);
      setLoadingCheck(false);
    });
  };

  return _react2.default.createElement(
    _export.ContentContainer,
    { width: width, height: height },
    _react2.default.createElement(
      _export.ContentTitle,
      null,
      translator.t("Todo")
    ),
    _react2.default.createElement(
      _material.Button,
      { onClick: Check, variant: "contained" },
      loadingCheck ? _react2.default.createElement(_material.CircularProgress, { size: 24, color: "inherit" }) : "Check"
    ),
    _react2.default.createElement(
      "div",
      null,
      todoContext.todo.tasks.map(function (task, index) {
        return _react2.default.createElement(
          _react2.default.Fragment,
          { key: index },
          task.type === "space" && _react2.default.createElement(
            _material.Alert,
            { sx: { margin: "10px 0" }, severity: "warning", key: index },
            _react2.default.createElement(
              "b",
              null,
              "Space: "
            ),
            task.spaceName,
            " needs to be added to the plan"
          ),
          task.type === "component" && _react2.default.createElement(
            _material.Alert,
            { sx: { margin: "10px 0" }, severity: "info", key: index },
            _react2.default.createElement(
              "b",
              null,
              "Component: "
            ),
            task.componentName,
            " needs to be added to the space of",
            " ",
            task.spaceName
          )
        );
      })
    )
  );
}

Todo.propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  state: _propTypes2.default.object.isRequired
};

Todo.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};