import React from 'react';
import ProjectList from "./pages/projectList";
import {useAuth} from "./context/authContext";
import {Button} from "antd";
/*已认证页面信息*/
const Authenticated = () => {
    const {loginOut} = useAuth();
    return (
        <div>
            <Button onClick={() => loginOut()}>退出登录</Button>
            <ProjectList/>
        </div>
    );
};

export default Authenticated;
