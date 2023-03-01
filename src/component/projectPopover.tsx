import React from "react";
import {Popover, Button, Typography, List, Divider} from "antd";
import {useProject} from "../utils/project";

export interface Props {
  modalOperation:JSX.Element
}

const ProjectPopover = (props:Props) => {
  const { modalOperation } = props;
  const {data,isLoading} = useProject();//获取项目列表
  //已收藏的项目
  const pinList = data?.filter(item => item.pin);
  const content =(
      <div>
        <Typography.Text type={'secondary'}>已收藏的项目</Typography.Text>
        <List size={'large'}>
          {
            pinList?.map(item => (
                <List.Item key={item.id}>
                  {item.name}
                </List.Item>
            ))
          }
        </List>
        <Divider/>
        {/* 新建项目弹出 */}
        { modalOperation }
      </div>
  )
  return (
      <Popover placement={'bottom'} content={content}>
        <Button type={'link'} style={{color:'black'}}>项目</Button>
      </Popover>
  )
}
export default ProjectPopover
