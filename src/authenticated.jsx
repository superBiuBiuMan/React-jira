import React from 'react';
import ProjectList from "./pages/projectList";
import {useAuth} from "./context/authContext";
import {Button, Dropdown,Menu} from "antd";
import styled from "@emotion/styled";
import Row from "../src/component/lib";
import { ReactComponent as SoftwareLogo } from "../src/assets/svg/software-logo.svg";



/*已认证页面信息*/
const Authenticated = () => {
    const {loginOut,userInfo} = useAuth();
    const items = [
        {
            key: '1',
            label: (
                <a onClick={ loginOut }>退出登录</a>
            ),
        },
    ];
    return (
        <>
            {/*头部*/}
            <Header between = {true} marginBottom={'1'}>
                {/*左侧*/}
                <HeaderLeft gap = {true}>
                    <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>
                {/*右侧*/}
                <HeaderRight>
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            Hi,{ userInfo.name }
                        </a>
                    </Dropdown>
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
const Header = styled(Row)
    `
        padding: 1rem 2rem;
    `;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled(Row)``;

/*主要内容样式*/
const Main = styled.div``

