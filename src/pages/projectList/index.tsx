import React  from "react";
import List from "./list";
import Panel from "./panel";
import {useDebounce, useDocumentTitle } from "../../utils";
import {Typography} from "antd";
import {useProject} from "../../utils/project";
import {useUsers} from "../../utils/users";
import {useProjectsSearchParams} from "./util";

export interface ListData {
  id:number,
  personId:number,
  name:string,
  organization:string,//部门
  created:string,//创建时间
  pin:boolean,//是否加入收藏
}
export interface Users {
  id:number,//唯一标识
  name:string,
}
export interface Params {
  name:string,
  personId:number,
}
export interface Props {
  modalOperation:JSX.Element,
}
const ProjectListScreen = (props:Props) => {
  const { modalOperation } = props;
  const [params,setParams] = useProjectsSearchParams();
  const {data:users} = useUsers()//请求的用户列表数据
  const {isError,isLoading,data:listData,error,retry } = useProject(useDebounce(params,100));//请求列表数据
  useDocumentTitle('列表界面',false);
  return (
    <div>
      {/*搜索条件*/}
      <div style={{display:"flex"}}>
        <Panel params={params} setParams = {setParams} users={users || []}/>
        {modalOperation}
      </div>

      {/*错误提示*/}
      { isError ? <Typography.Text type={'danger'}> { error?.message } </Typography.Text> : null }
      {/*列表信息*/}
      <List refresh={retry} dataSource={listData || []} users={users || []} loading={isLoading} />
    </div>
  );
};

ProjectListScreen.whyDidYouRender = false;

export default ProjectListScreen;
