"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolbarSaveButton;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _fa = require("react-icons/fa");

var _toolbarButton = require("./toolbar-button");

var _toolbarButton2 = _interopRequireDefault(_toolbarButton);

var _browser = require("../../utils/browser");

var _export = require("../../class/export");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;

  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    state = _export.Project.unselectAll(state).updatedState;
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    var plan = state.scene.toJS();
    console.log(plan);
    if (plan.key === key) {
      _axios2.default.patch("http://localhost:9001/plan/" + key, { key: key, plan: plan }).then(function (res) {
        console.log(res.data);
        // window.location.href = "http://localhost:3000/facilitystructure";
        // window.location.href = "http://localhost:3000/facilitystructure?search="+key;
      });
    } else {}
    // window.location.href = "http://localhost:3000/facilitystructure";
    // window.location.href = "http://localhost:3000/facilitystructure?search="+key;

    // browserDownload(state.get('scene').toJS());
  };

  return _react2.default.createElement(
    _toolbarButton2.default,
    {
      active: false,
      tooltip: translator.t("Save project"),
      onClick: saveProjectToFile
    },
    _react2.default.createElement(_fa.FaSave, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: _propTypes2.default.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  translator: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired
};