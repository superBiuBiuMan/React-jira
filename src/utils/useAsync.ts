import {useState} from "react";

export type Status = 'idle' | 'loading' | 'error' | 'success';
/*泛型指明类型*/
export interface State<D> {
  data: D | null,//数据
  error: Error | null,//错误数据
  status: Status,//状态
}

export const defaultStateValue:State<null> = {
  data: null,
  error: null,
  status: 'idle',
}

export const useAsync = <D>(init?:State<D>) => {
  const [state,setState] = useState<State<D>>({
    ...defaultStateValue,
    ...init,
  })

  /*设置数据*/
  const setData = (data:D) => {
    setState({
      data,
      error:null,
      status:'success'
    })
  }

  /*设置失败*/
  const setError = (error:Error) => {
    setState({
      data:null,
      error,
      status:'error',
    })
  }

  /*运行传入的promise*/
  const run = (promiseGive:Promise<D>) => {
    if(!promiseGive || !promiseGive.then) {
      throw new Error('请传入Promise类型数据')
    }
    setState({
      ...state,
      status:'loading',
    })
    return promiseGive
      .then((res:D) => {
        setData(res);
        return res;//实现链式调用
      })
      .catch(error => {
        setError(error);
        return error;//实现链式调用
      })
  }

  return {
    isIdle: state.status === 'idle',//是否处于未加载状态
    isLoading: state.status === 'loading',//是否处于加载状态
    isError: state.status === 'error',//是否加载出错
    isSuccess: state.status === 'success',//是否成功加载
    ...state,//将通过useState创建返回的值全部返回
    run,
    setState,
    setData,
    setError,
  }
}
