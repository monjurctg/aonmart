import axios from "axios";

const BannerServices = {};

BannerServices.list = async (id = null) => {
  let url = `http://system.aonmart.net/api/v1/stores/${id}/banners`;
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response;
    });
  return res;
};

BannerServices.listSlide = async (id = null) => {
  console.log("id", id);
  let url = `http://system.aonmart.net/api/v1/stores/${id}/slides`;
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .get(url)
    .then((response) => {
      console.log(res, "res");
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response.data;
    });
  return res;
};

BannerServices.video = async (id = null) => {
  // {{end_point}}/stores/{{store_id}}/videos
  let url = `http://system.aonmart.net/api/v1/stores/${id}/videos`;
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response.data;
    });
  return res;
};

BannerServices.forgetPassword = async (data) => {
  // {{end_point}}/stores/{{store_id}}/videos
  let url = `http://system.aonmart.net/api/v1/verify-forget-password`;
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response.data;
    });
  return res;
};

BannerServices.otpVerify = async (data) => {
  // {{end_point}}/stores/{{store_id}}/videos
  let url = `http://system.aonmart.net/api/v1/verify-otp`;
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response.data;
    });
  return res;
};

BannerServices.reset = async (data) => {
  // {{end_point}}/stores/{{store_id}}/videos
  let url = `http://system.aonmart.net/api/v1/reset-password`;
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response.data;
    });
  return res;
};

export default BannerServices;
