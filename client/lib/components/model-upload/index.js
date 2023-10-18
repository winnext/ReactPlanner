"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ModelUpload;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _material = require("@mui/material");

var _notistack = require("notistack");

var _export = require("../style/export");

var _model = require("../../services/model");

var _model2 = _interopRequireDefault(_model);

var _asset = require("../../services/asset");

var _asset2 = _interopRequireDefault(_asset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ModelUpload(props, context) {
  var width = props.width,
      height = props.height;
  var projectActions = context.projectActions,
      translator = context.translator;

  var _React$useState = _react2.default.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _useSnackbar = (0, _notistack.useSnackbar)(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar;

  var _React$useState3 = _react2.default.useState({
    assetKey: "",
    obj: null,
    mtl: null
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      model = _React$useState4[0],
      setModel = _React$useState4[1];

  var handleChange = function handleChange(event) {
    var _event$target = event.target,
        name = _event$target.name,
        value = _event$target.value;

    setModel(_extends({}, model, _defineProperty({}, name, value)));
  };

  var onSubmit = function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (model.assetKey === "") {
      enqueueSnackbar("Please select an asset", { variant: "error" });
      return;
    }
    if (model.obj === null) {
      enqueueSnackbar("Please select an obj file", { variant: "error" });
      return;
    }

    var formDataObj = new FormData();
    formDataObj.append("file", model.obj);

    var url = new URL(window.location.href);
    var planKey = url.searchParams.get("key");

    console.log("formDataObj", formDataObj);
    console.log(formDataObj.get("file"));

    _model2.default.upload(formDataObj).then(function (resObj) {
      console.log("resObj", resObj);
      if (model.mtl === null) {
        _asset2.default.create({
          planKey: planKey,
          assetKey: model.assetKey,
          modelObj: resObj.data.file.filename,
          modelMtl: ""
        }).then(function (res) {
          setLoading(false);
          enqueueSnackbar("Model uploaded successfully", {
            variant: "success"
          });
          window.location.href = new URL(window.location.href);
        }).catch(function (err) {
          console.log(err);
          enqueueSnackbar("Model upload failed", { variant: "error" });
        });
      } else {
        var formDataMtl = new FormData();
        formDataMtl.append("file", model.mtl);
        _model2.default.upload(formDataMtl).then(function (resMtl) {
          console.log("resMtl", resMtl);
          _asset2.default.create({
            planKey: planKey,
            assetKey: model.assetKey,
            modelObj: resObj.data.file.filename,
            modelMtl: resMtl.data.file.filename
          }).then(function (res) {
            setLoading(false);
            enqueueSnackbar("Model uploaded successfully", {
              variant: "success"
            });
            window.location.href = new URL(window.location.href);
          }).catch(function (err) {
            console.log(err);
            enqueueSnackbar("Model upload failed", { variant: "error" });
          });
        }).catch(function (err) {
          console.log(err);
          enqueueSnackbar("Model upload failed", { variant: "error" });
        });
      }
    }).catch(function (err) {
      console.log(err);
      enqueueSnackbar("Model upload failed", { variant: "error" });
    });
  };
  return _react2.default.createElement(
    _export.ContentContainer,
    { width: width, height: height },
    _react2.default.createElement(
      _export.ContentTitle,
      null,
      translator.t("Model Upload")
    ),
    _react2.default.createElement(
      "form",
      { onSubmit: onSubmit },
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h3",
          null,
          "Asset"
        ),
        _react2.default.createElement(
          _material.FormControl,
          { style: { width: "200px" } },
          _react2.default.createElement(
            _material.InputLabel,
            { id: "asset-select-label" },
            "Asset"
          ),
          _react2.default.createElement(
            _material.Select,
            {
              labelId: "asset-select-label",
              id: "demo-simple-select",
              value: model.assetKey,
              label: "Asset",
              name: "assetKey",
              onChange: handleChange
            },
            context.assets.elements.map(function (asset) {
              return _react2.default.createElement(
                _material.MenuItem,
                { key: asset.info.key, value: asset.info.key },
                asset.name
              );
            })
          )
        )
      ),
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h3",
          null,
          "Object File (.obj)"
        ),
        _react2.default.createElement("input", {
          type: "file",
          accept: ".obj",
          onChange: function onChange(e) {
            return handleChange({
              target: { name: "obj", value: e.target.files[0] }
            });
          }
        })
      ),
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h3",
          null,
          "Material File (.mtl)"
        ),
        _react2.default.createElement("input", {
          type: "file",
          accept: ".mtl",
          onChange: function onChange(e) {
            return handleChange({
              target: { name: "mtl", value: e.target.files[0] }
            });
          }
        })
      ),
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
                _export.FormSubmitButton,
                { size: "large", disabled: loading },
                loading ? _react2.default.createElement(_material.CircularProgress, { size: 20 }) : translator.t("Save")
              )
            )
          )
        )
      )
    )
  );
}

ModelUpload.propTypes = {
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  state: _propTypes2.default.object.isRequired
};

ModelUpload.contextTypes = {
  assets: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired,
  translator: _propTypes2.default.object.isRequired
};