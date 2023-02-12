import React, {Component, ErrorInfo, ReactNode} from "react";

export type Props =  {
  children:ReactNode,//子组件
  fallBackRender : (props: { error:Error | null  }) => React.ReactElement,
}

export interface State {
  error: Error | null;
}

export class Boundary extends Component<Props, State> {
  state = {
    error:null
  }

  static getDerivedStateFromError(error:Error){
    return {
      error
    }
  }

  componentDidCatch(error:Error, errorInfo:ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
  }

  render() {
    const { error } = this.state;
    const { children, fallBackRender } = this.props;
    if(error) return fallBackRender({error})
    return children;
  }
}
