import axios from "axios";

let payments = {};
const login_data = JSON.parse(localStorage.getItem("loginData"));

const access_token = login_data?.userData.access_token;

const config = {
  headers: {
    Authorization: `Bearer ${access_token}`,
    Accept: "application/json",
  },
};

payments.methods = async () => {
  let url = `/payment-methods`;
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .get(url, config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response;
    });
  return res;
};

export default payments;
