import React from "react";
import { ListData,Users } from "./index";
import {Table} from "antd";
export interface ListInterface {
  listData:ListData[]
  users:Users[],
}
const List = ({listData,users}:ListInterface) => {
  return (
      <Table pagination={false} dataSource={listData} rowKey={(record) => record.id} columns={[
        { title:'名称',dataIndex:'name',key:'name',sorter: (a,b) => a.name.localeCompare(b.name) },
        { title:'负责人',key:'name',render:(text,rowData) => (
            <span>{ users.find(ele => ele.id === rowData.personId)?.name }</span>
          )}
      ]}>
      </Table>
  );
};

export default List;
