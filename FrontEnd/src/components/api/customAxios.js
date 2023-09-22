import axios from "axios";

export const customAxios = axios.create({
  baseURL : "http://j9b206.p.ssafy.io/api",
  headers : {
    authorization : `Bearer ${localStorage.getItem("jwtToken")}`,
  }
})


export const authAxios = axios.create({
  baseURL : "http://j9b206.p.ssafy.io/api",
})