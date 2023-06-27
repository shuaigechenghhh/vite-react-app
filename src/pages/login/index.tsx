import React from "react";
import { getUserInfo, login as loginInfo } from "../../api/user";
// import { useRequest } from "alova";
import { useForm } from "@alova/scene-react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {  useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import "./index.less";
const login: React.FC = () => {
//   useRequest(getUserInfo());
const navigate = useNavigate();
  const initialForm = {
    username: "",
    password: "",
    remember: false,
  };
  const {
    // 提交状态
    loading: submiting,
    // 响应式的表单数据，内容由initialForm决定
    form,
    // 提交数据函数
    send: submit,
    // 更新表单项
    updateForm,
    // 提交成功回调绑定
    onSuccess,
  } = useForm(
    (formData: any) => {
      // 可以在此转换表单数据并提交
      return loginInfo(formData);
    },
    {
      // 初始化表单数据
      initialForm: initialForm,
    }
  );
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    submit(values)
    onSuccess((res)=>{
        console.log(11111,res)
        if(res.data.status===0){
            navigate('/home')
        }
    })
  };
  return (
    <div className="login-block">
      <div className="form-block">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={initialForm}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              onChange={({ target }) => updateForm({ username: target.value })}
              placeholder="Username"
              value={form.username}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              onChange={({ target }) => updateForm({ password: target.value })}
              type="password"
              placeholder="Password"
              value={form.password}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
                checked={form.remember}
                onChange={({ target }) =>
                  updateForm({ remember: target.value })
                }
              >
                Remember me
              </Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={submiting}
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default login;
