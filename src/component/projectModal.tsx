import React from "react";
import {Modal} from "antd";

export interface Props {
  visible:boolean,//是否可见
  cancel:() => void,//设置隐藏
}

const ProjectModal = (props:Props) => {
  const { visible,cancel } = props;
  return (
      <Modal open={visible} onCancel={cancel}>
        你好,大家好
      </Modal>
  )
}

export default ProjectModal;
