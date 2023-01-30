import React from "react";
import { Params, Users } from "./index";
import {Input,Form,Select} from "antd"
export interface Panel {
  params:Params,
  users:Users[],
  setParams:(params:Panel['params']) => void
}
const List = ({params,users,setParams}:Panel) => {
  return (
      <Form>
        <Form.Item>
          <Input value={params.name} placeholder={'请输入要搜索的名称'}  onChange={event => setParams({ ...params,name:event.target.value })}/>
          <Select value={params.personId} onChange={ value => setParams({ ...params,personId:value })}>
            <Select.Option value={""}>全部</Select.Option>
            {
              users.map(item => (
                  <Select.Option key={item.id} value={item.id}>{ item.name }</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
      </Form>
  );
};

export default List;
