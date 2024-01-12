import axios from 'axios'
import CryptoJS from "crypto-js";
import jQuery from "jquery";
import { message } from "antd";
const GenerateAuthorization=(path:any, method:any, params?:any)=>{
    const  key = "admin";
    const secret = "12878dd962115106db6d";
  
    const date = new Date();
    const datetime = date.getFullYear() + "-" // "年"
        + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1)) + "-" // "月"
        + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " " // "日"
        + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" // "小时"
        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" // "分钟"
        + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()); // "秒"
  
    const sortParamsEncode = decodeURIComponent(jQuery.param(params));
    const encryptStr = path + "|" + method.toUpperCase() + "|" + sortParamsEncode + "|" + datetime;
    const digest = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(encryptStr, secret));
    return {authorization: key + " " + digest, date: datetime};
  }
const http = axios.create({
    baseURL: '/',
    timeout: 50000,
});
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    const authorizationData = GenerateAuthorization('/api/admin/info', 'GET');
    const token=localStorage.getItem("token");
    config.headers.Authorization= authorizationData.authorization,
    config.headers['Authorization-Date']=authorizationData.date,
    config.headers.Token=token
    config.headers['Content-Type']=config.headers['Content-Type']?config.headers['Content-Type']:'application/x-www-form-urlencoded; charset=utf-8'
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    message.error({
        content:error.message
    })
    return Promise.reject(error);
});

export default http

export const GET=(url:string,params?:any,headers?:any)=>http.get(url,{
    params,
    headers
})