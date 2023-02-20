import React from "react";
import {IdSelect} from "./idSelect";
import {useUsers} from "../utils/users";

export const UserSelect = (props:React.ComponentProps<typeof IdSelect>) => {
  const { data:users } = useUsers();
  return <IdSelect options={users || undefined} defaultOptionName={'负责人'} {...props} />
}
