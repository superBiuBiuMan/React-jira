import {useAsync} from "./useAsync";
import {useEffect} from "react";
import {cleanEmptyObj} from "./index";
import {ListData, Users} from "../pages/projectList";
import {useHttp} from "./http";

export const useUsers = (params?:Partial<Users>) => {
  /*请求数据-携带token*/
  const client = useHttp();
  /*请求数据-带loading和error*/
  const {run,...result} = useAsync<ListData[]>();
  /*
  *  当搜索条件发生变化的时候,就更新
  * */
  useEffect( () => {
    run(client('users',{data:cleanEmptyObj(params)}))
  },[params,run,client])

  return result;
}
