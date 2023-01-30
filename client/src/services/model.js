import axios from "axios";

const url = process.env.REACT_APP_API_PLANNER + "model/";

const upload = (formData) => {
  return axios.post(url + "upload", formData);
};

const service = { upload };

export default service;
