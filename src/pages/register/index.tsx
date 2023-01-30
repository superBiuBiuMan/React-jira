import React, { FormEvent } from "react";
import {useAuth} from "../../context/authContext";
import {UserLoginInfo} from "../../types/user";
import { Button, Form, Input } from 'antd';
const Register = () => {
    const { register:registerHandle } = useAuth();
    const register = (params:UserLoginInfo) => {
        registerHandle(params);
    }
    /*点击登录*/
    const handleSubmit = ({username,password}: {username:string,password:string}) => {
        register({username,password})
    }
    return (
        <Form onFinish={handleSubmit}>
          <Form.Item label={'账号'} name={'username'} rules={[{ required:true,message:'请输入账号' }]}>
            <Input placeholder={'请输入用户名'}/>
          </Form.Item>

          <Form.Item label={'密码'} name={'password'} rules={[{ required:true,message:'请输入密码' }]}>
            <Input type={'password'} placeholder={'请输入密码'}/>
          </Form.Item>

          <Form.Item>
            <Button htmlType={'submit'}>注册</Button>
          </Form.Item>
        </Form>
    );
};

export default Register;
