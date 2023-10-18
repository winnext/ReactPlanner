"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = process.env.REACT_APP_API_PLANNER + "asset/";

var create = function create(asset) {
  return _axios2.default.post(url, asset);
};

var findAssetsByPlanKey = function findAssetsByPlanKey(planKey) {
  return _axios2.default.get(url + "plan/" + planKey);
};
var service = { create: create, findAssetsByPlanKey: findAssetsByPlanKey };

exports.default = service;