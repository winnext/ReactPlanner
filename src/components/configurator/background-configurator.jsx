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
    // event.preventDefault();
    localStorage.setItem("imgPath", this.state.imgPath);

    let { projectActions } = this.context;
    // projectActions.rollback()
  }

  render() {
    let { width, height } = this.props;
    let { projectActions, translator } = this.context;

    console.log(this.context);
    console.log(this.props);

    return (
      <ContentContainer width={width} height={height}>
        <ContentTitle>{translator.t("Background Config")}</ContentTitle>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <Dropzone
            onDrop={this.handleDrop}
            // accept="svg/*"
            // minSize={1024}
            // maxSize={3072000}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag'n'drop images, or click to select files</p>
              </div>
            )}
          </Dropzone>

          <img
            id="resim"
            src="#"
            alt="img"
            style={{ width: width / 2, height: height / 2 }}
          />

          <table style={{ float: "right" }}>
            <tbody>
              <tr>
                <td>
                  <CancelButton
                    size="large"
                    onClick={(e) => projectActions.rollback()}
                  >
                    {translator.t("Cancel")}
                  </CancelButton>
                </td>
                <td>
                  <DeleteButton
                    size="large"
                    onClick={(e) => {
                      localStorage.removeItem("imgPath");
                      location.reload();
                    }}
                  >
                    {translator.t("Clear")}
                  </DeleteButton>
                </td>
                <td>
                  <FormSubmitButton size="large">
                    {translator.t("Save")}
                  </FormSubmitButton>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
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
