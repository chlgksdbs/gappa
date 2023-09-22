import axios from "axios";

export const customAxios = axios.create({
  baseURL : "https://j9b206.p.ssafy.io/api",
  headers : {
    authorization : `Bearer ${localStorage.getItem("jwtToken")}`,
  }
})

export const authAxios = axios.create({
  baseURL : "https://j9b206.p.ssafy.io/api",
})