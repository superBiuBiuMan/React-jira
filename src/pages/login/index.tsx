import React, { FormEvent } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
const Login = () => {
  const login = (params:{username:string,password:string}) => {
    fetch(`${apiUrl}/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(params),
    }).then(async (response) =>{
      if(response.ok){
        //await response.json();
      }
    })
  }
  /*点击登录*/
  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();//阻止默认行为
    //@ts-ignore;
    const username = event.target[0].value;
    //@ts-ignore;
    const password = event.target[1].value;
    login({username,password})
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='username'>用户名</label>
      <input type='text' id='username' />
      <br/>
      <label htmlFor='password'>密码</label>
      <input type='password' id='password' />
      <button type='submit'>登录</button>
    </form>
  );
};

export default Login;
