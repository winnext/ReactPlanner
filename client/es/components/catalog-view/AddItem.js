var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

var schema = yup.object({
    name: yup.string().required(),
    width: yup.number().required(),
    height: yup.number().required(),
    image: yup.string()
}).required();

var AddItem = function AddItem() {
    var _useForm = useForm({
        resolver: yupResolver(schema),
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

    return React.createElement(
        "form",
        { onSubmit: handleSubmit(onSubmit), style: { width: "50%" } },
        React.createElement(
            "div",
            null,
            React.createElement(TextField, _extends({
                sx: { margin: "1em 0", width: "100%" },
                error: errors.name !== undefined,
                label: "Name",
                helperText: errors.name === undefined ? "" : errors.name.message
            }, register("name")))
        ),
        React.createElement(
            "div",
            null,
            React.createElement(TextField, _extends({
                sx: { margin: "1em 0", width: "100%" },
                error: errors.width !== undefined,
                label: "Width",
                helperText: errors.width === undefined ? "" : errors.width.message
            }, register("width")))
        ),
        React.createElement(
            "div",
            null,
            React.createElement(TextField, _extends({
                sx: { margin: "1em 0", width: "100%" },
                error: errors.height !== undefined,
                label: "Height",
                helperText: errors.height === undefined ? "" : errors.height.message
            }, register("height")))
        ),
        React.createElement(
            "div",
            null,
            React.createElement(TextField, _extends({
                sx: { margin: "1em 0", width: "100%" },
                error: errors.image !== undefined,
                label: "Image Url",
                helperText: errors.image === undefined ? "" : errors.image.message
            }, register("image")))
        ),
        React.createElement(
            "div",
            { style: { display: "flex", justifyContent: "flex-end" } },
            React.createElement(
                Button,
                { variant: "contained", size: "large", type: "submit" },
                "Save"
            )
        )
    );
};

export default AddItem;