import React from 'react';
import { useAuth } from '../../context/authContext';
import { UserLoginInfo } from '../../types/user';
import { Button, Form, Input } from 'antd';
const Login = () => {
  const { login: loginHandle } = useAuth();
  const login = (params: UserLoginInfo) => {
    loginHandle(params);
  };
  /*点击登录*/
  const handleSubmit = ({username,password}: {username:string,password:string}) => {
    login({ username, password });
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label={'账号'} name={'username'} rules={[{ required:true,message:'请输入账号' }]}>
        <Input  placeholder={'请输入账号'} />
      </Form.Item>
      <Form.Item label={'密码'} name={'password'} rules={[{ required:true,message:'请输入密码' }]}>
        <Input type={'password'} placeholder={'请输入密码'} />
      </Form.Item>
      <Form.Item >
        <Button type={'primary'} htmlType={'submit'}>登录</Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
