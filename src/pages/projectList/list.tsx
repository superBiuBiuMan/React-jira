import React from "react";
import { ListData,Users } from "./index";
import {Table} from "antd";
import dayjs from "dayjs";
export interface ListInterface {
  listData:ListData[]
  users:Users[],
}
const List = ({listData,users}:ListInterface) => {
  const columns = [
    {
      title:'名称',
      dataIndex:'name',
      sorter: (a,b) => a.name.localeCompare(b.name)
    },
    {
      title:'部门',
      dataIndex: 'organization',
    },
    {
      title:'负责人',
      render:(text,rowData) => (
          <span>{ users.find(ele => ele.id === rowData.personId)?.name }</span>
      )
    },
    {
      title:'创建时间',
      dataIndex:'created',
      render:(text,item) => (
          <span> { text ? dayjs(text).format('YYYY-MM-DD') : '--' } </span>
      )
    }
  ]
  return (
      <Table pagination={false} dataSource={listData} rowKey={(record) => record.id} columns={columns}>
      </Table>
  );
};

export default List;
