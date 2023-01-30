import React,{useState} from 'react';
import Login from "../login";
import Register from "../register";
import {Button,Card} from "antd";

const UnAuthenticated = () => {
    const [isRegister,setIsRegister] = useState(false);
    return (
        <Card style={{width:'300px',margin:'40px auto'}}>
            {
                isRegister ? <Register/> : <Login/>
            }
            <Button onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? '已有账号,点击登录' : '还没有账号?点击注册' }
            </Button>
        </Card>
    );
};

export default UnAuthenticated;
