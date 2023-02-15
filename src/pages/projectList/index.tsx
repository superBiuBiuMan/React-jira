import React, {useState } from "react";
import List from "./list";
import Panel from "./panel";
import {useDebounce, useDocumentTitle, useMount} from "../../utils";
import {Typography} from "antd";
import {useProject} from "../../utils/project";
import {useUsers} from "../../utils/users";
import {useUrlQueryParams} from "../../utils/url";

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
  //params
  const [,setParams] = useState<Params>({
    name:'',
    personId:'',
  })
  const [keys] = useState<('name' | 'personId')[]>(['name','personId'])
  const [params] = useUrlQueryParams(keys)
  const debounceValue = useDebounce(params,100);

  const {data:users} = useUsers()//请求的用户列表数据
  const {isError,isLoading,data:listData,error } = useProject(debounceValue);//请求列表数据
  useDocumentTitle('列表界面',false);
  return (
    <div>
      {/*搜索条件*/}
      <Panel params={params} setParams = {setParams} users={users || []}/>
      {/*错误提示*/}
      { isError ? <Typography.Text type={'danger'}> { error?.message } </Typography.Text> : null }
      {/*列表信息*/}
      <List dataSource={listData || []} users={users || []} loading={isLoading} />
    </div>
  );
};

export default ProjectListScreen;
