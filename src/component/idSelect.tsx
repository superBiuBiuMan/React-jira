import {Options, Raw} from "../types/types";
import {Select} from "antd";
import {SelectProps} from "antd/es/select";
export type OnChange = (value?:number) => void;


export interface IdSelectProps extends Omit<SelectProps,"value" | "onChange" | "options">{
  value: Raw | null | undefined,
  onChange:OnChange
  defaultOptionName?:string,
  options?:Options[]
}

export const IdSelect = (props:IdSelectProps) => {
  const {value,onChange,defaultOptionName,options,...originProps} = props;
  return (
      <Select value={ options?.length ? toNumber(value) : 0 } onChange={(value) => onChange(toNumber(value) || undefined)} {...originProps}>
        {/* 默认项 */}
        {
          defaultOptionName ? <Select.Option value={0}>{ defaultOptionName }</Select.Option> : null
        }
        {
          options?.map(item => (
              <Select.Option key={item.id} value={item.id}>{ item.name }</Select.Option>
          ))
        }
      </Select>
  )
}

export const toNumber = (value:unknown) => isNaN(Number(value)) ? 0 : Number(value);
