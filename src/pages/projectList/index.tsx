import React, {useState, useEffect} from "react";
import List from "./list";
import Panel from "./panel";
import { cleanEmptyObj, useDebounce, useMount } from "../../utils";
import {useHttp} from "../../utils/http";
export interface ListData {
  id:number,
  personId:number,
  name:string,
  organization:string,//部门
  created:string,//创建时间
}
export interface Users {
  id:number,//唯一标识
  name:string,
}
export interface Params {
  name:string,
  personId:string | number,
}
const ProjectListScreen = () => {
  /*搜索参数*/
  const [params,setParams] = useState<Params>({
    name:'',
    personId:'',
  })
  const debounceValue = useDebounce(params,100);
  /*请求的用户列表数据*/
  const [users,setUsers] = useState<Users[]>([])
  /*请求列表数据*/
  const [listData,setListData] = useState<ListData[]>([])
  /*请求数据-携带token*/
  const client = useHttp();
  /*
  *  当搜索条件发生变化的时候,就更新
  * */
  useEffect( () => {
    client('projects',{data:cleanEmptyObj(debounceValue)}).then(res => {
      setListData(res)
    })
    // todo 依懒项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debounceValue])

  /*
  * 初次加载用户(只需要执行一次)
  * */
  useMount(async () => {
    client('users').then(res => {
      setUsers(res)
    })
  })
  return (
    <div>
      <Panel params={params} setParams = {setParams} users={users}/>
      <List listData={listData} users={users}/>
    </div>
  );
};

export default ProjectListScreen;
