import qs from "qs"
import {useAuth} from "../context/authContext";
import * as auth from "../AuthProvider"
import {loginOut} from "../AuthProvider";
const apiUrl = process.env.REACT_APP_API_URL;
export interface Config extends RequestInit{
  token?:string,//登录后的token,
  data?:object,
}
const http =  (url:string,{data,token,headers,...customConfig}:Config) => {
  const config:RequestInit = {
    method:'GET',
    headers:{
      Authorization: token ? `Bear ${token}` : '',
      'Content-Type': data? 'application/json' : '',
    },
    ...customConfig,
  }
  switch (config.method){
    case 'post':
    case 'POST': config.body = JSON.stringify(data || {});break;
    case 'get':
    case 'GET':
    default: url+=`?${qs.stringify(data)}`;break;
  }
  return window.fetch(`${apiUrl}/${url}`,config)
      .then(async (response) => {
        if(response.status === 401){
          //await auth.loginOut();//不可以直接在非hooks里面使用hooks(也就是不是useXxx开头的函数)
          await auth.loginOut();//引入provider当中方法,而不是通过hooks
          window.location.reload();
          return Promise.reject({message:'请重新登录'})
        }
        const data = await response.json();
        if(response.ok){
          return data;
        }else{
          return Promise.reject(data);
        }
      })
}
export default http;
/*hooks里面才可以使用hooks,所以这里创建一个hooks,以便使用useAuth当中的hooks*/
export const useHttp = () => {
  const {userInfo} = useAuth();
  return (...[url,config]:Parameters<typeof http>) => http(url,{...config,token:userInfo.token});
}
