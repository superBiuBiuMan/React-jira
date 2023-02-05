import React from 'react';
import ProjectList from "./pages/projectList";
import {useAuth} from "./context/authContext";
import {Button} from "antd";
import styled from "@emotion/styled";
import Row from "../src/component/lib";
/*已认证页面信息*/
const Authenticated = () => {
    const {loginOut} = useAuth();
    return (
        <>
            {/*头部*/}
            <Header between = {true} marginBottom={'1'}>
                {/*左侧*/}
                <HeaderLeft gap = {true}>
                    <h3>Logo</h3>
                    <h3>Logo</h3>
                    <h3>Logo</h3>
                </HeaderLeft>
                {/*右侧*/}
                <HeaderRight>
                    <Button onClick={() => loginOut()}>退出登录</Button>
                </HeaderRight>
            </Header>
            {/*主要内容*/}
            <Main>
                <ProjectList/>
            </Main>
        </>
    );
};

export default Authenticated;
const Header = styled(Row)``;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled(Row)``;

/*主要内容样式*/
const Main = styled.div``

