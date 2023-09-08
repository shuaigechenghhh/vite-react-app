import { uploadAlova } from "..";


//切片上传
export const sliceUpdate = (param: any) =>
uploadAlova.Post("/upload/post", param);

//合并上传
export const mergeUpdate = (param: any) =>
uploadAlova.Get("/upload/merge", {params:param});