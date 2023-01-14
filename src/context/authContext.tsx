import React, {ReactNode, useState,useContext} from "react";
import * as providerAuth from "../AuthProvider";
import {UserInfo,UserLoginInfo} from "../types/user";
import {useMount} from "../utils";
import {getToken} from "../AuthProvider";
import http from "../utils/http";
export interface AuthInterface {
    userInfo:UserInfo,//用户相关信息
    login:(data:UserLoginInfo) => void;//用户登录
    loginOut: () => void;//用户登出
    register: (data:UserLoginInfo) => void;//用户注册
}

export const AuthContext = React.createContext<AuthInterface | undefined >(undefined)

/*初始化登录数据如果localStorage存在*/
const initUserInfo = async () => {
    const token = getToken();//从localStorage获取token
    if(token){
        //存在
        return await http('me',{token}).then(res => res?.user)
    }else{
        //不存在
        return null;
    }
}

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({})
    const login = (data:UserLoginInfo) => providerAuth.login(data).then((res:any) => {
        setUserInfo(res?.user)
    })
    const loginOut = () => providerAuth.loginOut()
    /*注册*/
    const register = (data:UserLoginInfo) => providerAuth.register(data).then((res:any) => {
        setUserInfo(res)
    })
    useMount(() => {
        initUserInfo().then(setUserInfo)
    })
    return <AuthContext.Provider children={children} value={{userInfo,login,loginOut,register}}/>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('必须要在AuthProvider中使用')
    return context;
}
