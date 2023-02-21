import React from "react";
import { ListData,Users } from "./index";
import {Table, TableProps} from "antd";
import dayjs from "dayjs";
import {Link} from "react-router-dom"
import {Pin} from "../../component/pin";
import {useEditProject} from "../../utils/project";
export interface ListInterface extends TableProps<ListData> {
  users:Users[],//用户信息
}

const List = ({ users,...tableProps}:ListInterface) => {
  const { mutate } = useEditProject();
  const pinProject = (id:number) => (checked:boolean) => mutate({id,pin:checked})
  /*列数据*/
  const columns = [
    {
      title:<Pin checked={true} disabled={true}/>,
      render(value: any, project: any) {
        return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
      }
    },
    {
      title:'名称',
      dataIndex:'name',
      render(value:any,project:any){
        // todo 为什么一定要
        return <Link to={String(project.id)}>{ project.name } </Link>
      }
    },
    {
      title:'部门',
      dataIndex: 'organization',
    },
    {
      title:'负责人',
      render:(text:any,rowData:any) => (
          <span>{ users.find(ele => ele.id === rowData.personId)?.name }</span>
      )
    },
    {
      title:'创建时间',
      dataIndex:'created',
      render:(text:any,) => (
          <span> { text ? dayjs(text).format('YYYY-MM-DD') : '--' } </span>
      )
    }
  ]
  return (
      <Table pagination={false}  rowKey={(record) => record.id} columns={columns} {...tableProps}></Table>
  );
};

export default List;
