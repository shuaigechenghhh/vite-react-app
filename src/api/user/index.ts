import { userAlova } from "..";

// 获取用户信息
export const getUserInfo = () => userAlova.Get("/users");
//登录
export const login = (param: any) =>
  userAlova.Post("/users/login", param, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
