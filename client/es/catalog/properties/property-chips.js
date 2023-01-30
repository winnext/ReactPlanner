var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React from "react";
import PropTypes from "prop-types";
import { FormLabel, FormTextInput } from "../../components/style/export";
import PropertyStyle from "./shared-property-style";
import { MdClose } from "react-icons/md";

export default function PropertyChips(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;

  var update = function update(val) {
    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val);
      });
    }

    return onUpdate(val);
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "table",
      {
        className: "PropertyChips",
        style: _extends({}, PropertyStyle.tableStyle, { marginBottom: "1em" })
      },
      React.createElement(
        "tbody",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            { style: PropertyStyle.firstTdStyle },
            React.createElement(
              FormLabel,
              null,
              configs.label
            )
          ),
          React.createElement(
            "td",
            null,
            React.createElement(FormTextInput, {
              onKeyDown: function onKeyDown(event) {
                if (event.key === "Enter") {
                  update([].concat(_toConsumableArray(value), [event.target.value]));
                  event.target.value = "";
                }
              }
            })
          )
        )
      )
    ),
    React.createElement(
      "table",
      { style: _extends({}, PropertyStyle.tableStyle, { marginBottom: "2em" }) },
      React.createElement(
        "tbody",
        null,
        value.map(function (item, index) {
          return React.createElement(
            "tr",
            { key: index },
            React.createElement(
              "td",
              {
                className: "chips-item",
                onClick: function onClick() {
                  return update(value.filter(function (_, ind) {
                    return ind !== index;
                  }));
                }
              },
              React.createElement(
                "span",
                null,
                "#",
                item
              ),
              React.createElement(
                "span",
                { className: "chips-delete-btn" },
                React.createElement(MdClose, null)
              )
            )
          );
        })
      )
    )
  );
}

PropertyChips.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};