"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = process.env.REACT_APP_API_PLANNER + "model/";

var upload = function upload(formData) {
  return _axios2.default.post(url + "upload", formData);
};

var service = { upload: upload };

exports.default = service;