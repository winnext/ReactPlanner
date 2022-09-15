var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import FormNumberInput from "../../../style/form-number-input";
import FormTextInput from "../../../style/form-text-input";
import { Button } from "@mui/material";

var tableStyle = { width: "100%" };
var firstTdStyle = { width: "6em" };
var inputStyle = { textAlign: "left" };

export default function ItemAttributesEditor(_ref, _ref2) {
  var element = _ref.element,
      onUpdate = _ref.onUpdate,
      attributeFormData = _ref.attributeFormData,
      state = _ref.state,
      rest = _objectWithoutProperties(_ref, ["element", "onUpdate", "attributeFormData", "state"]);

  var translator = _ref2.translator;

  var name = attributeFormData.has("name") ? attributeFormData.get("name") : element.name;
  var renderedX = attributeFormData.has("x") ? attributeFormData.get("x") : element.x;
  var renderedY = attributeFormData.has("y") ? attributeFormData.get("y") : element.y;
  var renderedR = attributeFormData.has("rotation") ? attributeFormData.get("rotation") : element.rotation;
  var itemData = attributeFormData.has("itemData") ? attributeFormData.get("itemData") : element.itemData;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "table",
      { style: tableStyle },
      React.createElement(
        "tbody",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            { style: firstTdStyle },
            translator.t("Name")
          ),
          React.createElement(
            "td",
            null,
            React.createElement(FormTextInput, {
              value: name,
              onChange: function onChange(event) {
                return onUpdate("name", event.target.value);
              },
              style: inputStyle
            })
          )
        ),
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            { style: firstTdStyle },
            "X"
          ),
          React.createElement(
            "td",
            null,
            React.createElement(FormNumberInput, _extends({
              value: renderedX,
              onChange: function onChange(event) {
                return onUpdate("x", event.target.value);
              },
              style: inputStyle,
              state: state,
              precision: 2
            }, rest))
          )
        ),
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            { style: firstTdStyle },
            "Y"
          ),
          React.createElement(
            "td",
            null,
            React.createElement(FormNumberInput, _extends({
              value: renderedY,
              onChange: function onChange(event) {
                return onUpdate("y", event.target.value);
              },
              style: inputStyle,
              state: state,
              precision: 2
            }, rest))
          )
        ),
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            { style: firstTdStyle },
            translator.t("Rotation")
          ),
          React.createElement(
            "td",
            null,
            React.createElement(FormNumberInput, _extends({
              value: renderedR,
              onChange: function onChange(event) {
                return onUpdate("rotation", event.target.value);
              },
              style: inputStyle,
              state: state,
              precision: 2
            }, rest))
          )
        )
      )
    ),
    itemData ? itemData.map(function (item, index) {
      return React.createElement(
        React.Fragment,
        { key: index },
        React.createElement("hr", null),
        React.createElement(
          "table",
          { style: tableStyle },
          React.createElement(
            "tbody",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                { style: firstTdStyle },
                "Name"
              ),
              React.createElement(
                "td",
                null,
                React.createElement(FormTextInput, {
                  value: item.name,
                  onChange: function onChange(event) {
                    return onUpdate("itemData", itemData.map(function (a, b) {
                      if (b === index) a.name = event.target.value;
                      return a;
                    }));
                  },
                  style: inputStyle
                })
              )
            ),
            React.createElement(
              "tr",
              null,
              React.createElement(
                "td",
                { style: firstTdStyle },
                "Value"
              ),
              React.createElement(
                "td",
                null,
                React.createElement(FormTextInput, {
                  value: item.value,
                  onChange: function onChange(event) {
                    return onUpdate("itemData", itemData.map(function (a, b) {
                      if (b === index) a.value = event.target.value;
                      return a;
                    }));
                  },
                  style: inputStyle
                })
              )
            )
          )
        ),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: function onClick() {
              return onUpdate("itemData", itemData.filter(function (_, i) {
                return i !== index;
              }));
            }
          },
          "delete"
        ),
        React.createElement("hr", null)
      );
    }) : null,
    React.createElement(
      "button",
      {
        onClick: function onClick() {
          return onUpdate("itemData", [].concat(_toConsumableArray(itemData), [{ name: "", value: "" }]));
        }
      },
      "+"
    )
  );
}

ItemAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

ItemAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired
};