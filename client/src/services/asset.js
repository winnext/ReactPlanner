import axios from "axios";

const url = process.env.REACT_APP_API_PLANNER + "asset/";

const create = (asset) => {
  return axios.post(url, asset);
};

const findAssetsByPlanKey = (planKey) => {
    return axios.get(url + "plan/" + planKey);
};
const service = { create,findAssetsByPlanKey };

export default service;
