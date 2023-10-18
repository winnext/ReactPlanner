var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import PropTypes from "prop-types";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { ContentTitle, ContentContainer, FormSubmitButton, CancelButton, DeleteButton } from "../style/export";
import ModelService from "../../services/model";
import AssetService from "../../services/asset";

export default function ModelUpload(props, context) {
  var width = props.width,
      height = props.height;
  var projectActions = context.projectActions,
      translator = context.translator;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  var _useSnackbar = useSnackbar(),
      enqueueSnackbar = _useSnackbar.enqueueSnackbar;

  var _React$useState3 = React.useState({
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

    ModelService.upload(formDataObj).then(function (resObj) {
      console.log("resObj", resObj);
      if (model.mtl === null) {
        AssetService.create({
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
        ModelService.upload(formDataMtl).then(function (resMtl) {
          console.log("resMtl", resMtl);
          AssetService.create({
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
  return React.createElement(
    ContentContainer,
    { width: width, height: height },
    React.createElement(
      ContentTitle,
      null,
      translator.t("Model Upload")
    ),
    React.createElement(
      "form",
      { onSubmit: onSubmit },
      React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "Asset"
        ),
        React.createElement(
          FormControl,
          { style: { width: "200px" } },
          React.createElement(
            InputLabel,
            { id: "asset-select-label" },
            "Asset"
          ),
          React.createElement(
            Select,
            {
              labelId: "asset-select-label",
              id: "demo-simple-select",
              value: model.assetKey,
              label: "Asset",
              name: "assetKey",
              onChange: handleChange
            },
            context.assets.elements.map(function (asset) {
              return React.createElement(
                MenuItem,
                { key: asset.info.key, value: asset.info.key },
                asset.name
              );
            })
          )
        )
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "Object File (.obj)"
        ),
        React.createElement("input", {
          type: "file",
          accept: ".obj",
          onChange: function onChange(e) {
            return handleChange({
              target: { name: "obj", value: e.target.files[0] }
            });
          }
        })
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "Material File (.mtl)"
        ),
        React.createElement("input", {
          type: "file",
          accept: ".mtl",
          onChange: function onChange(e) {
            return handleChange({
              target: { name: "mtl", value: e.target.files[0] }
            });
          }
        })
      ),
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
                FormSubmitButton,
                { size: "large", disabled: loading },
                loading ? React.createElement(CircularProgress, { size: 20 }) : translator.t("Save")
              )
            )
          )
        )
      )
    )
  );
}

ModelUpload.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired
};

ModelUpload.contextTypes = {
  assets: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};