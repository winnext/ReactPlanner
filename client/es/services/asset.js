import axios from "axios";

var url = process.env.REACT_APP_API_PLANNER + "asset/";

var create = function create(asset) {
  return axios.post(url, asset);
};

var findAssetsByPlanKey = function findAssetsByPlanKey(planKey) {
  return axios.get(url + "plan/" + planKey);
};
var service = { create: create, findAssetsByPlanKey: findAssetsByPlanKey };

export default service;