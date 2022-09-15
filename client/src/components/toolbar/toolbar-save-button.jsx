import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios"
import {FaSave as IconSave} from 'react-icons/fa';
import ToolbarButton from './toolbar-button';
import {browserDownload}  from '../../utils/browser';
import { Project } from '../../class/export';

export default function ToolbarSaveButton({state}, {translator}) {

  let saveProjectToFile = e => {
    e.preventDefault();
    state = Project.unselectAll( state ).updatedState;
    const url = new URL(window.location.href);
    const key = url.searchParams.get("key");
    const plan = state.get('scene').toJS();
    axios.patch("http://localhost:9001/plan/"+key,{key,plan}).then(res=>{
      window.location.href = "http://localhost:3000/facilitystructure"
    })
    // browserDownload(state.get('scene').toJS());
  };

  return (
    <ToolbarButton active={false} tooltip={translator.t('Save project')} onClick={saveProjectToFile}>
      <IconSave />
    </ToolbarButton>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired,
};
