"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PropertyChips;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require("../../components/style/export");

var _sharedPropertyStyle = require("./shared-property-style");

var _sharedPropertyStyle2 = _interopRequireDefault(_sharedPropertyStyle);

var _md = require("react-icons/md");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function PropertyChips(_ref) {
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

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      "table",
      {
        className: "PropertyChips",
        style: _extends({}, _sharedPropertyStyle2.default.tableStyle, { marginBottom: "1em" })
      },
      _react2.default.createElement(
        "tbody",
        null,
        _react2.default.createElement(
          "tr",
          null,
          _react2.default.createElement(
            "td",
            { style: _sharedPropertyStyle2.default.firstTdStyle },
            _react2.default.createElement(
              _export.FormLabel,
              null,
              configs.label
            )
          ),
          _react2.default.createElement(
            "td",
            null,
            _react2.default.createElement(_export.FormTextInput, {
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
    _react2.default.createElement(
      "table",
      { style: _extends({}, _sharedPropertyStyle2.default.tableStyle, { marginBottom: "2em" }) },
      _react2.default.createElement(
        "tbody",
        null,
        value.map(function (item, index) {
          return _react2.default.createElement(
            "tr",
            { key: index },
            _react2.default.createElement(
              "td",
              {
                className: "chips-item",
                onClick: function onClick() {
                  return update(value.filter(function (_, ind) {
                    return ind !== index;
                  }));
                }
              },
              _react2.default.createElement(
                "span",
                null,
                "#",
                item
              ),
              _react2.default.createElement(
                "span",
                { className: "chips-delete-btn" },
                _react2.default.createElement(_md.MdClose, null)
              )
            )
          );
        })
      )
    )
  );
}

PropertyChips.propTypes = {
  value: _propTypes2.default.any.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  configs: _propTypes2.default.object.isRequired,
  sourceElement: _propTypes2.default.object,
  internalState: _propTypes2.default.object,
  state: _propTypes2.default.object.isRequired
};