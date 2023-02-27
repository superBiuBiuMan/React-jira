import {useCallback, useState} from "react";
import {useMountedRef} from "./url";

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

export const defaultConfig = {
  throwOnError:false,
}

export const useAsync = <D>(init?:State<D>,initConfig?:typeof defaultConfig) => {
  const config = {...initConfig,...init};
  const mountedRef = useMountedRef();
  const [state,setState] = useState<State<D>>({
    ...defaultStateValue,
    ...init,
  })

  const [retry,setRetry] = useState(() => () => {})

  /*设置数据*/
  const setData = useCallback((data:D) => {
        setState({
          data,
          error:null,
          status:'success'
        })
      }
  ,[setState])
  /*设置失败*/
  const setError = useCallback((error:Error) => {
    setState({
      data:null,
      error,
      status:'error',
    })
  },[setState])

  /*运行传入的promise*/
  const run = useCallback((promiseGive:Promise<D>,runConfig?:{ retry: () => Promise<D> }) => {
    if(!promiseGive || !promiseGive.then) {
      throw new Error('请传入Promise类型数据')
    }
    setRetry(() => () => {
      console.log("执行了retry")
      if(runConfig?.retry){
        run(runConfig.retry(),runConfig)
      }
    })
    setState((prevState) => {
      return {
        ...prevState,
        status: 'loading',
      }
    })
    return promiseGive
    .then((res:D) => {
      if(mountedRef.current){
        setData(res);
      }
      return Promise.resolve(res);//实现链式调用
    })
    .catch(error => {
      setError(error);
      if(config.throwOnError) return Promise.reject(error);
      return error;//实现链式调用
    })
  },[config.throwOnError,mountedRef,setState,setData,setError])

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
    retry,
  }
}
