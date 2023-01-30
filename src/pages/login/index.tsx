import React, { FormEvent } from 'react';
import { useAuth } from '../../context/authContext';
import { UserLoginInfo } from '../../types/user';
const Login = () => {
  const { login: loginHandle } = useAuth();
  const login = (params: UserLoginInfo) => {
    loginHandle(params);
  };
  /*点击登录*/
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); //阻止默认行为
    //@ts-ignore;
    const username = event.target[0].value;
    //@ts-ignore;
    const password = event.target[1].value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='username'>用户名</label>
      <input type='text' id='username' />
      <br />
      <label htmlFor='password'>密码</label>
      <input type='password' id='password' />
      <button type='submit'>登录</button>
    </form>
  );
};

export default Login;
