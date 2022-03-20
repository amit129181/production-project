import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3035/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
