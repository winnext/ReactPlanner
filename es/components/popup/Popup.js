var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import * as React from 'react';
import { Context } from "../../Context/Context";
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, Slide, TextField } from "@mui/material";

var Transition = React.forwardRef(function Transition(props, ref) {
  return React.createElement(Slide, _extends({ direction: "up", ref: ref }, props));
});

export default function Popup() {

  var context = React.useContext(Context);

  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      data = _React$useState2[0],
      setData = _React$useState2[1];

  React.useEffect(function () {
    if (context.select.select) {
      if (context.data.data[context.select.select.id]) {
        setData(context.data.data[context.select.select.id]);
      } else {
        setData([]);
      }
    }
  }, [context.popup.open]);

  var handleChange = function handleChange(e, name, index) {
    var value = e.target.value;

    if (e.target.value !== null) {
      setData(function (prevValue) {
        var temp = JSON.parse(JSON.stringify(prevValue));
        if (name === "name") {
          temp[index].name = value;
        } else if (name === "value") {
          temp[index].value = value;
        }
        return temp;
      });
    }
  };

  var addProperties = function addProperties() {
    setData(function (prevValue) {
      return [].concat(_toConsumableArray(prevValue), [{ name: "", value: "" }]);
    });
  };

  var Save = function Save() {
    if (context.select.select) {
      context.data.setData(function (prevValue) {
        var temp = prevValue;
        temp[context.select.select.id] = data;
        localStorage.setItem("data", JSON.stringify(temp));
        return temp;
      });
    }
    context.popup.setOpen(false);
  };

  return React.createElement(
    Dialog,
    {
      open: context.popup.open,
      TransitionComponent: Transition,
      keepMounted: true,
      onClose: function onClose() {
        return context.popup.setOpen(false);
      }
    },
    React.createElement(
      DialogTitle,
      null,
      context.select.select && "id: " + context.select.select.id
    ),
    React.createElement(
      DialogContent,
      null,
      context.select.select && React.createElement(
        "div",
        null,
        data.map(function (item, index) {
          return React.createElement(
            "div",
            { key: index, style: { marginTop: "15px", display: "flex", alignItems: "center" } },
            React.createElement(
              "span",
              { style: { fontSize: "1.8em", marginRight: "10px" } },
              index + 1,
              "."
            ),
            React.createElement(TextField, { style: { marginRight: "10px" }, value: item.name, onChange: function onChange(e) {
                return handleChange(e, "name", index);
              }, label: "Name", variant: "outlined" }),
            React.createElement(TextField, { value: item.value, onChange: function onChange(e) {
                return handleChange(e, "value", index);
              }, label: "Value", variant: "outlined" })
          );
        }),
        React.createElement(
          Button,
          { style: { marginTop: "10px" }, onClick: addProperties },
          "Add Properties"
        )
      )
    ),
    React.createElement(
      DialogActions,
      null,
      React.createElement(
        Button,
        { onClick: function onClick() {
            return context.popup.setOpen(false);
          } },
        "Cancel"
      ),
      React.createElement(
        Button,
        { onClick: Save },
        "Save"
      )
    )
  );
}