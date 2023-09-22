import axios from "axios";

export const customAxios = axios.create({
  baseURL : "/api",
  headers : {
    authorization : `Bearer ${localStorage.getItem("jwtToken")}`,
  }
})


export const authAxios = axios.create({
  baseURL : "/api",
})