var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { ContentTitle, ContentContainer, FormSubmitButton, CancelButton, DeleteButton } from "../style/export";
import { Alert, Button, CircularProgress } from "@mui/material";

import { TodoContext } from "../../Context";
import axios from "axios";

export default function Todo(props, context) {
  var width = props.width,
      height = props.height;
  var projectActions = context.projectActions,
      translator = context.translator;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loadingCheck = _React$useState2[0],
      setLoadingCheck = _React$useState2[1];

  var todoContext = React.useContext(TodoContext);

  var Check = function Check() {
    setLoadingCheck(true);
    axios.post("http://localhost:9001/todo/check", {
      planKey: todoContext.todo.planKey
    }).then(function () {
      axios.post("http://localhost:9001/todo/check", {
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

  return React.createElement(
    ContentContainer,
    { width: width, height: height },
    React.createElement(
      ContentTitle,
      null,
      translator.t("Todo")
    ),
    React.createElement(
      Button,
      { onClick: Check, variant: "contained" },
      loadingCheck ? React.createElement(CircularProgress, { size: 24, color: "inherit" }) : "Check"
    ),
    React.createElement(
      "div",
      null,
      todoContext.todo.tasks.map(function (task, index) {
        return React.createElement(
          React.Fragment,
          { key: index },
          task.type === "space" && React.createElement(
            Alert,
            { sx: { margin: "10px 0" }, severity: "warning", key: index },
            React.createElement(
              "b",
              null,
              "Space: "
            ),
            task.spaceName,
            " needs to be added to the plan"
          ),
          task.type === "component" && React.createElement(
            Alert,
            { sx: { margin: "10px 0" }, severity: "info", key: index },
            React.createElement(
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};

Todo.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};