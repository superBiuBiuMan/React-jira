import React, {useState} from 'react';
import {Dropdown, Button, Row} from "antd";
import styled from "@emotion/styled";
import { ReactComponent as SoftwareLogo } from "../../assets/svg/software-logo.svg";
import ProjectList from "../projectList";
import Project from "../project";
import {useAuth} from "../../context/authContext";
import {BrowserRouter as Router, Navigate} from "react-router-dom";
import {Routes,Route} from "react-router";
import ProjectPopover from "../../component/projectPopover";
import ProjectModal from "../../component/projectModal";
import {useSelector,useDispatch} from "react-redux";
import {projectListSliceActions, selectProjectModalOpen} from "../projectList/projectList.slice";
const Authenticated = () => {
  //const [showModal,setShowModal] = useState(false);//是否可见对话框
  const showModal = useSelector(selectProjectModalOpen);//等同于 const showModal = useSelector((state) => state.projectList.projectModalOpen)
  console.log('结果是',showModal)
  const dispatch = useDispatch();
  const ModalOperation = <Button style={{padding:0}} onClick={() => dispatch(projectListSliceActions.openProjectModal())} type={'link'}>创建项目</Button>
  return (
      <>
        {/*头部*/}
        <Header >
          <HeaderContain popOver={<ProjectPopover modalOperation={ModalOperation}/>} modalOperation={ModalOperation}/>
        </Header>
        {/*主要内容*/}
        <Main>
          <Router>
            <Routes>
              <Route path={'/projects'} element={<ProjectList/>}
              />
              <Route path={'/projects/:projectId/*'} element={<Project/>}/>
              <Route path={'/'} element={<Navigate to={'/projects'}/>}/>
            </Routes>
          </Router>
        </Main>
        {/* 编辑和创建对话框 */}
        <ProjectModal visible={showModal} cancel={() => dispatch(projectListSliceActions.closeProjectModal())}/>
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

export interface PropsHeader {
  popOver:JSX.Element,
  modalOperation:JSX.Element,
}

const HeaderContain = (props:PropsHeader) => {
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
          <h3>{ props.popOver }</h3>
          <h3><Button type={'link'} style={{color:'black'}}>用户</Button></h3>
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
