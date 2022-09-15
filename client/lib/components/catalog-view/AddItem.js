"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _material = require("@mui/material");

var _reactHookForm = require("react-hook-form");

var _yup = require("@hookform/resolvers/yup");

var _yup2 = require("yup");

var yup = _interopRequireWildcard(_yup2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = yup.object({
    name: yup.string().required(),
    width: yup.number().required(),
    height: yup.number().required(),
    image: yup.string()
}).required();

var AddItem = function AddItem() {
    var _useForm = (0, _reactHookForm.useForm)({
        resolver: (0, _yup.yupResolver)(schema),
        defaultValues: {
            name: "",
            width: "100",
            height: "100",
            image: ""
        }
    }),
        register = _useForm.register,
        handleSubmit = _useForm.handleSubmit,
        errors = _useForm.formState.errors;

    var onSubmit = function onSubmit(data) {
        var items = JSON.parse(localStorage.getItem("items"));
        data.image = data.image === "" ? "https://via.placeholder.com/" + data.width + "x" + data.height : data.image;
        if (items) {
            items.push(data);
            localStorage.setItem('items', JSON.stringify(items));
        } else {
            localStorage.setItem('items', JSON.stringify([data]));
        }
        location.reload();
    };

    return _react2.default.createElement(
        "form",
        { onSubmit: handleSubmit(onSubmit), style: { width: "50%" } },
        _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_material.TextField, _extends({
                sx: { margin: "1em 0", width: "100%" },
                error: errors.name !== undefined,
                label: "Name",
                helperText: errors.name === undefined ? "" : errors.name.message
            }, register("name")))
        ),
        _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_material.TextField, _extends({
                sx: { margin: "1em 0", width: "100%" },
                error: errors.width !== undefined,
                label: "Width",
                helperText: errors.width === undefined ? "" : errors.width.message
            }, register("width")))
        ),
        _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_material.TextField, _extends({
                sx: { margin: "1em 0", width: "100%" },
                error: errors.height !== undefined,
                label: "Height",
                helperText: errors.height === undefined ? "" : errors.height.message
            }, register("height")))
        ),
        _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_material.TextField, _extends({
                sx: { margin: "1em 0", width: "100%" },
                error: errors.image !== undefined,
                label: "Image Url",
                helperText: errors.image === undefined ? "" : errors.image.message
            }, register("image")))
        ),
        _react2.default.createElement(
            "div",
            { style: { display: "flex", justifyContent: "flex-end" } },
            _react2.default.createElement(
                _material.Button,
                { variant: "contained", size: "large", type: "submit" },
                "Save"
            )
        )
    );
};

exports.default = AddItem;