import React from "react";
import { ListData,Users } from "./index";
export interface ListInterface {
  listData:ListData[]
  users:Users[],
}
const List = ({listData,users}:ListInterface) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {
          listData?.map(item => {
            return (
              <tr key={item.id}>
                <td>{ item.name }</td>
                <td>{ users.find(ele => ele.id === item.personId)?.name }</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
};

export default List;
