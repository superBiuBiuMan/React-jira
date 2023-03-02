import {useCallback, useState} from "react";

const UseUndo = <T>(initData:T) => {
  const [state,setState] = useState<{
    backList:T[],//过去的记录
    present:T,//现在的值,
    goList:T[],//前面的记录
  }>({
    backList:[],
    goList:[],
    present:initData,
  })
  const [canBack,setCanBack] = useState(() => state.backList.length > 0);//是否可以后退
  const [canGo,setCanGo] = useState(() => state.goList.length > 0);//是否可以前进

  /* 执行返回 */
  const execBack = useCallback(() => {
    setState((currentState) => {
      if(!canBack) return currentState;
      const { goList:oldGoList,backList:oldBackList } = currentState;
      const present = oldBackList[oldBackList.length-1];
      const backList = oldBackList.slice(0,oldGoList.length - 1);
      const goList = [...oldGoList,present];
      return {
        goList,
        backList,
        present,
      }
    })
  },[])

  /* 执行前进 */
  const execGo = useCallback(() => {
    setState((currentState) => {
      if(!canGo) return currentState;
      const { goList:oldGoList,backList:oldBackList } = currentState;
      const present = oldGoList[0];
      const goList = oldGoList.slice(1);
      const backList = [...oldBackList,present];
      return {
        goList,
        backList,
        present,
      }
    })
  },[])

  /* 设置值 */
  const set = useCallback((newData:T) => {
    setState((currentState) => {
      const { goList:oldGoList,backList:oldBackList,present:oldPresent } = currentState;
      if(newData === oldPresent) return currentState;
      const backList = [...oldBackList,oldPresent];
      return {
        goList:[],
        backList,
        present:newData,
      }
    })
  },[])


  /* 重置 */
  const reset = useCallback(() => {
    setState((currentState) => {
      const { goList,backList } = currentState;
      return {
        goList:[],
        backList:[],
        present:initData,
      }
    })
  },[])

  return [
      state,
      execBack,
      execGo,
      set,
      reset,
      canBack,
      canGo,
  ] as const
}

export default UseUndo
