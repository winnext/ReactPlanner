import axios from "axios";

var url = process.env.REACT_APP_API_PLANNER + "model/";

var upload = function upload(formData) {
  return axios.post(url + "upload", formData);
};

var service = { upload: upload };

export default service;