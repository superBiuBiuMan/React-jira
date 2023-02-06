import React,{useState} from 'react';
import Login from "../login";
import Register from "../register";
import {Button, Card, Divider, Typography} from "antd";
import styled from '@emotion/styled';
import Logo from "assets/svg/logo.svg";
import LeftBg from "assets/svg/left.svg";
import RightBg from "assets/svg/right.svg";
const UnAuthenticated = () => {
    const [isRegister,setIsRegister] = useState(false);
    const [error,setError] = useState<Error | null>(null);
    return (
        <Container>
          <Header/>
          <ShowCard>
            { error ? <Typography.Text type={'danger'}> { error.message } </Typography.Text> : null}
            {
              isRegister ? <Register onError={setError}/> : <Login onError={setError}/>
            }
            <Divider/>
            <HrefWrapper>
              <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? '已有账号,点击登录' : '还没有账号?点击注册' }
              </Button>
            </HrefWrapper>
          </ShowCard>
        </Container>
    );
};

const Container = styled.div
    `
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      /*设置背景图*/
      background-repeat: no-repeat;
      background-position: left bottom, right bottom;
      background-size: calc(((100vw - 40rem)/2) - 3.2rem ) ,calc(((100vw - 40rem)/2) - 3.2rem ),cover;
      background-attachment: fixed;
      background-image: url(${LeftBg}),url(${RightBg});
    `

const ShowCard = styled(Card)
    `
      box-sizing: border-box;
      width: 40rem;
      min-height: 40rem;
      padding: 3.2rem 4rem;
      border-radius: 0.3rem;
      box-shadow: 0 0 1rem rgba(0,0,0,.1);
    `
/*头部logo*/
const Header = styled.header
    `
     background: url(${Logo}) no-repeat center; 
     width: 100%;
     padding: 4rem 0;
     background-size: 8rem ;
    `
/*长按钮*/
export const LongButton = styled(Button)
    `
      width: 100%;!important;
    `
const HrefWrapper = styled.div
    `
      text-align: center;
    `
export default UnAuthenticated;
