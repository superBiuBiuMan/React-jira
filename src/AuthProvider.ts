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
/*获取用户信息*/
export const getToken = ()=> window.localStorage.getItem(localStorageKey);
/*登录*/
export const login:Login = (data:UserLoginInfo) => {
    return fetch(`${apiUrl}/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
    }).then(async (response) =>{
        const data = await response.json();
        if(response.status === 400){
            return Promise.reject(data);
        }
        if(response.ok){
            return storeUserInfo(data);
        }else{
            return Promise.reject('登录发生错误')
        }
    }).catch((res:any) => {
        alert(res?.message)
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
        const data = await response.json();
        if(response.status === 400){
            return Promise.reject(data);
        }
        if(response.ok){
            return storeUserInfo(data);
        }else{
            return Promise.reject('注册发生错误')
        }
    }).catch((res:any) => {
        alert(res?.message)
    })
}

/*登出*/
export const loginOut = async () => {
    return window.localStorage.removeItem(localStorageKey)
}
