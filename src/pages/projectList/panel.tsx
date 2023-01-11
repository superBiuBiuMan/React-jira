import React from "react";
import { Params, Users } from "./index";
export interface Panel {
  params:Params,
  users:Users[],
  setParams:(params:Panel['params']) => void
}
const List = ({params,users,setParams}:Panel) => {
  return (
    <form>
      <input type='text' value={params.name} placeholder={'请输入要搜索的名称'}  onChange={event => setParams({ ...params,name:event.target.value })}/>
      <select value={params.personId} onChange={event => setParams({
        ...params,
        personId: event.target.value,
      })}>
        <option value={''}>全部</option>
        {
          users.map(item => {
            return (
              <option value={item.id} key={item.id}>{ item.name }</option>
            )
          })
        }
      </select>
    </form>
  );
};

export default List;
