import React from "react";
import {Rate} from "antd";

export interface PinProps extends React.ComponentProps<typeof Rate>{
  checked:boolean,
  onCheckedChange?:(checked:boolean) => void,
}

export const Pin = (props:PinProps) => {
  const { checked , onCheckedChange,...originProps} = props;
  return (
      <Rate count={1} value={ checked ? 1 : 0 } onChange={(num) => onCheckedChange && onCheckedChange(!!num)} {...originProps}/>
  )
}
