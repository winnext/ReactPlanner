import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaSave as IconSave } from "react-icons/fa";
import ToolbarButton from "./toolbar-button";
import { browserDownload } from "../../utils/browser";
import { Project } from "../../class/export";

export default function ToolbarSaveButton(_ref, _ref2) {
  var state = _ref.state;
  var translator = _ref2.translator,
      projectActions = _ref2.projectActions;

  var saveProjectToFile = function saveProjectToFile(e) {
    e.preventDefault();
    state = Project.unselectAll(state).updatedState;
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    var plan = state.scene.toJS();
    console.log(plan);
    if (plan.key === key) {
      axios.patch("http://localhost:9001/plan/" + key, { key: key, plan: plan }).then(function (res) {
        console.log(res.data);
        // window.location.href = "http://localhost:3000/facilitystructure";
        // window.location.href = "http://localhost:3000/facilitystructure?search="+key;
      });
    } else {}
    // window.location.href = "http://localhost:3000/facilitystructure";
    // window.location.href = "http://localhost:3000/facilitystructure?search="+key;

    // browserDownload(state.get('scene').toJS());
  };

  return React.createElement(
    ToolbarButton,
    {
      active: false,
      tooltip: translator.t("Save project"),
      onClick: saveProjectToFile
    },
    React.createElement(IconSave, null)
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired
};