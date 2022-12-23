import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import {
  ContentTitle,
  ContentContainer,
  FormSubmitButton,
  CancelButton,
  DeleteButton,
} from "../style/export";

export default class ProjectConfigurator extends Component {
  constructor(props, context) {
    super(props, context);

    let scene = props.state.scene;

    this.state = {
      imgPath: "",
    };

    this.handleDrop = this.handleDrop.bind(this);
  }

  //Get img in client
  handleDrop(acceptedFiles) {
    let imgPath = "";
    //render to img tag
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("resim").setAttribute("src", e.target.result);
      imgPath = e.target.result;
    };
    reader.readAsDataURL(acceptedFiles[0]);
    setTimeout(() => {
      this.setState({ imgPath: imgPath });
    }, 10);
  }

  onSubmit(event) {
    event.preventDefault();
    localStorage.setItem("imgPath", this.state.imgPath);
    window.location.href =  new URL(window.location.href)

    let { projectActions } = this.context;
    // projectActions.rollback()
  }

  render() {
    let { width, height } = this.props;
    let { projectActions, translator } = this.context;

    return (
      <ContentContainer width={width} height={height}>
        <ContentTitle>{translator.t("Todo")}</ContentTitle>
        
      </ContentContainer>
    );
  }
}

ProjectConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

ProjectConfigurator.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
