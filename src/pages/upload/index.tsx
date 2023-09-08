import { UploadOutlined } from "@ant-design/icons";
import { Button, Progress } from "antd";
import { useRef, useState } from "react";
import { mergeUpdate } from "../../api/upload/index.ts";
import axios from "axios";
const FileUpload = () => {
  const fileInput = useRef(null);
  const [fileName, setFileName] = useState("");
  const [percent, setPercent] = useState(0);
  const onClick = () => {
    console.log("fileInput", fileInput);
    fileInput.current?.click();
  };
  const sliceFile = (file: any) => {
    if (!file) {
      return;
    }
    const size = 1024 * 1000;
    let index = 0;
    const fileChunks = [];
    for (let i = 0; i < file.size; i += size) {
      fileChunks.push({
        hash: index++,
        chunk: file.slice(i, i + size),
      });
    }
    console.log(88881, fileChunks);
    uploadFileChunks(fileChunks, file);
  };
  const uploadFileChunks = async (list: any, file: any) => {
    if (list.length === 0) {
      await mergeUpdate({ filename: file.name }).send(true);
      console.log("上传完成");
      return;
    }
    const pool: any = []; //并发池
    const max = 3; //最大并发量
    let finish = 0; //完成的数量
    const failList: any = []; //失败的列表
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const formData = new FormData();
      formData.append("filename", file.name);
      formData.append("hash", item.hash);
      formData.append("chunk", item.chunk);
      // 上传切片
      const task = axios({
        method: "post",
        url: "http://localhost:3002/upload",
        data: formData,
      });
      task
        .then((data: any) => {
          //请求结束后将该Promise任务从并发池中移除
          const index = pool.findIndex((t) => t === task);
          pool.splice(index);
        })
        .catch(() => {
          failList.push(item);
        })
        .finally(() => {
          finish++;
          setPercent((finish / list.length) * 100);
          //所有请求都请求完成
          if (finish === list.length) {
            uploadFileChunks(failList, file);
          }
        });
      pool.push(task);
      if (pool.length === max) {
        //每当并发池跑完一个任务，就再塞入一个任务
        await Promise.race(pool);
      }
    }
  };
  const onChange = (e: any) => {
    const {
      target: { files },
    } = e;
    const file = files[0];
    setFileName(file.name);
    sliceFile(file);
  };
  return (
    <>
      <div className="Upload" onClick={onClick}>
        <input
          type="file"
          onClick={(e) => e.stopPropagation()} // https://github.com/ant-design/ant-design/issues/19948
          style={{ display: "none" }}
          onChange={onChange}
          ref={fileInput}
        />
        <Button icon={<UploadOutlined />}>Upload</Button>
        <span style={{ marginLeft: "10px" }}>{fileName}</span>
      </div>
      <Progress percent={percent} />
    </>
  );
};

export default FileUpload;
