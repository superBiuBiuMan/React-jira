import React from "react";
import {useAuth} from "../../context/authContext";
import { Form, Input } from 'antd';
import {LongButton} from "../unAuthenticated";
import {useAsync} from "../../utils/useAsync";

const Register = ({ onError } : {onError: (error:Error | null) => void}) => {
    const { register } = useAuth();
    const { isLoading,run } = useAsync(undefined,{throwOnError: true});
    /*点击登录*/
    const handleSubmit = async ({username,password}: {username:string,password:string}) => {
      try {
        await run(register({ username, password }))
        onError(null);
      }catch (e) {
        onError(e);
      }
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
            <LongButton htmlType={'submit'} type={'primary'} loading={isLoading}>注册</LongButton>
          </Form.Item>
        </Form>
    );
};
export default Register;
