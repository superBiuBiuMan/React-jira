import React from 'react';
import ProjectList from "./pages/projectList";
import {useAuth} from "./context/authContext";
/*已认证页面信息*/
const Authenticated = () => {
    const {loginOut} = useAuth();
    return (
        <div>
            <button onClick={() => loginOut()}>退出登录</button>
            <ProjectList/>
        </div>
    );
};

export default Authenticated;
