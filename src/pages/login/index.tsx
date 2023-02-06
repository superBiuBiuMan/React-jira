import React from 'react';
import { useAuth } from '../../context/authContext';
import { Form, Input } from 'antd';
import {LongButton} from "../unAuthenticated";
import {useAsync} from "../../utils/useAsync";

const Login = ({onError}:{onError:(error:Error | null) => void}) => {
  const { login } = useAuth();
  const {run,isLoading} = useAsync(undefined,{throwOnError: true});
  /*点击登录*/
  const handleSubmit = async ({username,password}: {username:string,password:string}) => {
    try {
      await run(login({ username, password }))
      onError(null);
    }catch (e) {
      onError(e);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label={'账号'} name={'username'} rules={[{ required:true,message:'请输入账号' }]}>
        <Input  placeholder={'请输入账号'} />
      </Form.Item>
      <Form.Item label={'密码'} name={'password'} rules={[{ required:true,message:'请输入密码' }]}>
        <Input type={'password'} placeholder={'请输入密码'}  />
      </Form.Item>
      <Form.Item >
        <LongButton type={'primary'} htmlType={'submit'} loading={isLoading}>登录</LongButton>
      </Form.Item>
    </Form>
  );
};

export default Login;
