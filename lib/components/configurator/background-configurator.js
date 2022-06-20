"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDropzone = require("react-dropzone");

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _export = require("../style/export");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      // event.preventDefault();
      localStorage.setItem("imgPath", this.state.imgPath);

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


      console.log(this.context);
      console.log(this.props);

      return _react2.default.createElement(
        _export.ContentContainer,
        { width: width, height: height },
        _react2.default.createElement(
          _export.ContentTitle,
          null,
          translator.t("Background Config")
        ),
        _react2.default.createElement(
          "form",
          { onSubmit: function onSubmit(e) {
              return _this3.onSubmit(e);
            } },
          _react2.default.createElement(
            _reactDropzone2.default,
            {
              onDrop: this.handleDrop
              // accept="svg/*"
              // minSize={1024}
              // maxSize={3072000}
            },
            function (_ref) {
              var getRootProps = _ref.getRootProps,
                  getInputProps = _ref.getInputProps;
              return _react2.default.createElement(
                "div",
                getRootProps({ className: "dropzone" }),
                _react2.default.createElement("input", getInputProps()),
                _react2.default.createElement(
                  "p",
                  null,
                  "Drag'n'drop images, or click to select files"
                )
              );
            }
          ),
          _react2.default.createElement("img", {
            id: "resim",
            src: "#",
            alt: "img",
            style: { width: width / 2, height: height / 2 }
          }),
          _react2.default.createElement(
            "table",
            { style: { float: "right" } },
            _react2.default.createElement(
              "tbody",
              null,
              _react2.default.createElement(
                "tr",
                null,
                _react2.default.createElement(
                  "td",
                  null,
                  _react2.default.createElement(
                    _export.CancelButton,
                    {
                      size: "large",
                      onClick: function onClick(e) {
                        return projectActions.rollback();
                      }
                    },
                    translator.t("Cancel")
                  )
                ),
                _react2.default.createElement(
                  "td",
                  null,
                  _react2.default.createElement(
                    _export.DeleteButton,
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
                _react2.default.createElement(
                  "td",
                  null,
                  _react2.default.createElement(
                    _export.FormSubmitButton,
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
}(_react.Component);

exports.default = ProjectConfigurator;


ProjectConfigurator.propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  state: _propTypes2.default.object.isRequired
};

ProjectConfigurator.contextTypes = {
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};