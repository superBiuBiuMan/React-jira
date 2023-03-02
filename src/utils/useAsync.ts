import {useCallback, useReducer, useState} from "react";
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

export const useSafeDispatch = <T>(dispatch: (...args:T[]) => void) => {
  const mountedRef = useMountedRef();
  // todo 这个是什么意思
  return useCallback((...args:T[]) => {
    return mountedRef.current ? dispatch(...args) : void 0;
  },[mountedRef,dispatch])
}

export const useAsync = <D>(init?:State<D>,initConfig?:typeof defaultConfig) => {
  const config = {...initConfig,...init};
  //const mountedRef = useMountedRef();
  //const [state,setState] = useState<State<D>>({
  //  ...defaultStateValue,
  //  ...init,
  //})


  // 会覆盖原有的,之前的不会丢失这样子写{...prevState,...action}
  const [state,dispatch] = useReducer((prevState: State<D>, action: Partial<State<D>>) => ({...prevState,...action}),{
      ...defaultStateValue,
      ...init,
  })
  const safeDispatch = useSafeDispatch(dispatch);//todo 查看
  const [retry,setRetry] = useState(() => () => {})

  /*设置数据*/
  const setData = useCallback((data:D) => {
        safeDispatch({
          data,
          error:null,
          status:'success'
        })
      }
  ,[safeDispatch])
  /*设置失败*/
  const setError = useCallback((error:Error) => {
    safeDispatch({
      data:null,
      error,
      status:'error',
    })
  },[safeDispatch])

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
    safeDispatch({
      status:'loading',
    })
    return promiseGive
    .then((res:D) => {
        setData(res);
      return Promise.resolve(res);//实现链式调用
    })
    .catch(error => {
      setError(error);
      if(config.throwOnError) return Promise.reject(error);
      return error;//实现链式调用
    })
  },[config.throwOnError,setData,setError,safeDispatch])

  return {
    isIdle: state.status === 'idle',//是否处于未加载状态
    isLoading: state.status === 'loading',//是否处于加载状态
    isError: state.status === 'error',//是否加载出错
    isSuccess: state.status === 'success',//是否成功加载
    ...state,//将通过useState创建返回的值全部返回
    run,
    dispatch,
    setData,
    setError,
    retry,
  }
}
