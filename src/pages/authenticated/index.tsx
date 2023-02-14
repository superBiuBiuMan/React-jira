import React from 'react';
import {Dropdown, Button, Row} from "antd";
import styled from "@emotion/styled";
import { ReactComponent as SoftwareLogo } from "../../assets/svg/software-logo.svg";
import ProjectList from "../projectList";
import Project from "../project";
import {useAuth} from "../../context/authContext";
import {BrowserRouter as Router, Navigate} from "react-router-dom";
import {Routes,Route} from "react-router";
const Authenticated = () => {

  return (
      <>
        {/*头部*/}
        <Header >
          <HeaderContain/>
        </Header>
        {/*主要内容*/}
        <Main>
          <Router>
            <Routes>
              <Route path={'/projects'} element={<ProjectList/>}/>
              <Route path={'/projects/:projectId/*'} element={<Project/>}/>
              <Route path={'/'} element={<Navigate to={'/projects'}/>}/>
            </Routes>
          </Router>
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

const HeaderContain = () => {
  const {loginOut,userInfo} = useAuth();
  const items = [
    {
      key: '1',
      label: (
          <Button type={'link'} onClick={ loginOut }>退出登录</Button>
      ),
    },
  ];
  return (
      <>
        <HeaderLeft >
          <Button type={'link'} onClick={resetRoute}>
            <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'}/>
          </Button>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown menu={{ items }}>
            <Button type={'link'} onClick={(e:any) => e.preventDefault()}>
              Hi,{ userInfo.name }
            </Button>
          </Dropdown>
        </HeaderRight>
      </>
  )
}

/*主要内容样式*/
const Main = styled.div``

export const resetRoute = () => window.location.href = window.location.origin
