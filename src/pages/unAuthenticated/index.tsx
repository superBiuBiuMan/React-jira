import React,{useState} from 'react';
import Login from "../login";
import Register from "../register";

const UnAuthenticated = () => {
    const [isRegister,setIsRegister] = useState(false);
    return (
        <div>
            {
                isRegister ? <Register/> : <Login/>
            }
            <button onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? '已有账号,点击登录' : '还没有账号?点击注册' }
            </button>
        </div>
    );
};

export default UnAuthenticated;
