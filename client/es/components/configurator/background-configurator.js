var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { ContentTitle, ContentContainer, FormSubmitButton, CancelButton, DeleteButton } from "../style/export";

var ProjectConfigurator = function (_Component) {
  _inherits(ProjectConfigurator, _Component);

  function ProjectConfigurator(props, context) {
    _classCallCheck(this, ProjectConfigurator);

    var _this = _possibleConstructorReturn(this, (ProjectConfigurator.__proto__ || Object.getPrototypeOf(ProjectConfigurator)).call(this, props, context));

    var scene = props.state.scene;

    _this.state = {
      imgPath: ""
    };

    _this.handleDrop = _this.handleDrop.bind(_this);
    return _this;
  }

  //Get img in client


  _createClass(ProjectConfigurator, [{
    key: "handleDrop",
    value: function handleDrop(acceptedFiles) {
      var _this2 = this;

      var imgPath = "";
      //render to img tag
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("resim").setAttribute("src", e.target.result);
        imgPath = e.target.result;
      };
      reader.readAsDataURL(acceptedFiles[0]);
      setTimeout(function () {
        _this2.setState({ imgPath: imgPath });
      }, 10);
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      event.preventDefault();
      localStorage.setItem("imgPath", this.state.imgPath);
      window.location.href = new URL(window.location.href);

      var projectActions = this.context.projectActions;
      // projectActions.rollback()
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height;
      var _context = this.context,
          projectActions = _context.projectActions,
          translator = _context.translator;


      return React.createElement(
        ContentContainer,
        { width: width, height: height },
        React.createElement(
          ContentTitle,
          null,
          translator.t("Background Config")
        ),
        React.createElement(
          "form",
          { onSubmit: function onSubmit(e) {
              return _this3.onSubmit(e);
            } },
          React.createElement(
            Dropzone,
            {
              onDrop: this.handleDrop
              // accept="svg/*"
              // minSize={1024}
              // maxSize={3072000}
            },
            function (_ref) {
              var getRootProps = _ref.getRootProps,
                  getInputProps = _ref.getInputProps;
              return React.createElement(
                "div",
                getRootProps({ className: "dropzone" }),
                React.createElement("input", getInputProps()),
                React.createElement(
                  "p",
                  null,
                  "Drag'n'drop images, or click to select files"
                )
              );
            }
          ),
          React.createElement("img", {
            id: "resim",
            src: "#",
            alt: "img",
            style: { width: width / 2, height: height / 2 }
          }),
          React.createElement(
            "table",
            { style: { float: "right" } },
            React.createElement(
              "tbody",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  null,
                  React.createElement(
                    CancelButton,
                    {
                      size: "large",
                      onClick: function onClick(e) {
                        return projectActions.rollback();
                      }
                    },
                    translator.t("Cancel")
                  )
                ),
                React.createElement(
                  "td",
                  null,
                  React.createElement(
                    DeleteButton,
                    {
                      size: "large",
                      onClick: function onClick(e) {
                        localStorage.removeItem("imgPath");
                        location.reload();
                      }
                    },
                    translator.t("Clear")
                  )
                ),
                React.createElement(
                  "td",
                  null,
                  React.createElement(
                    FormSubmitButton,
                    { size: "large" },
                    translator.t("Save")
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ProjectConfigurator;
}(Component);

export default ProjectConfigurator;


ProjectConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};

ProjectConfigurator.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};