import React from "react";
import { Params, Users } from "./index";
import {Input,Form,Select} from "antd"
import {UserSelect} from "../../component/useSelect";

export interface Panel {
  params:Partial<Params>,
  users:Users[],
  setParams:(params:Panel['params']) => void
}
const List = ({params,users,setParams}:Panel) => {
  return (
      <Form style={{marginBottom: '2rem'}} layout={'inline'}>
        <Form.Item>
          <Input value={params.name} placeholder={'请输入要搜索的名称'}  onChange={event => setParams({ ...params,name:event.target.value })}/>
        </Form.Item>
        <Form.Item>
          <UserSelect value={params.personId} onChange={ value => setParams({ ...params,personId:value })}/>
        </Form.Item>
      </Form>
  );
};

export default List;
