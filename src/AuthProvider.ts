import {UserLoginInfo} from "./types/user";
const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";//存储的字段名
export type Login = (data:UserLoginInfo) => Promise<void>
export type Register = (data:UserLoginInfo) => Promise<void>
export type StoreUserInfo = (data:UserLoginInfo) => void;

/*存储用户信息*/
export const storeUserInfo:StoreUserInfo = (data:any) => {
    window.localStorage.setItem(localStorageKey,data.user.token ?? '');
    return data;
}

/*登录*/
export const login:Login = (data:UserLoginInfo) => {
    return fetch(`${apiUrl}/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
    }).then(async (response) =>{
        if(response.ok){
            return storeUserInfo(await response.json());
        }else{
            return Promise.reject('登录发生错误')
        }
    })
}
/*注册*/
export const register:Register = (data:UserLoginInfo) => {
    return fetch(`${apiUrl}/register`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
    }).then(async (response) =>{
        if(response.ok){
            return storeUserInfo(await response.json());
        }else{
            return Promise.reject('注册发生错误')
        }
    })
}

/*登出*/
export const loginOut = () => {
    window.localStorage.removeItem(localStorageKey)
}
