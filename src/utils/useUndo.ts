import {useCallback, useReducer, useState} from "react";

export enum TypeOperation {
  go='go',
  back='back',
  set='set',
  reset='reset',
}

export interface State<T> {
  backList:T[],//过去的记录
  present:T,//现在的值,
  goList:T[],//前面的记录
}

export interface Action<T> {
  newPresent?:T,
  type: TypeOperation,
}
const unDoReducer = <T>(state:State<T>,action:Action<T>) => {
  const {type,newPresent} = action;
  const { goList:oldGoList,backList:oldBackList,present:oldPresent } = state;
  switch (type){
    case "back": {
      if(oldBackList.length ===0 ) return state;
      const present = oldBackList[oldBackList.length-1];
      const backList = oldBackList.slice(0,oldGoList.length - 1);
      const goList = [...oldGoList,present];
      return {
        goList,
        backList,
        present,
      }
    }
    case "go": {
      if(oldGoList.length === 0) return state;
      const present = oldGoList[0];
      const goList = oldGoList.slice(1);
      const backList = [...oldBackList,present];
      return {
        goList,
        backList,
        present,
      }
    }
    case "reset":{
      return {
        goList:[],
        backList:[],
        present:newPresent,
      }
    }
    case "set": {
      if(newPresent === oldPresent) return state;
      const backList = [...oldBackList,oldPresent];
      return {
        goList:[],
        backList,
        present:newPresent,
      }
    }
    default: return state;
  }
}


const UseUndo = <T>(initData:T) => {
  const [state,dispatch] = useReducer(unDoReducer,{
      backList:[],
      goList:[],
      present:initData,
  })
  const [canBack,setCanBack] = useState(() => state.backList.length > 0);//是否可以后退
  const [canGo,setCanGo] = useState(() => state.goList.length > 0);//是否可以前进
  /* 执行返回 */
  const execBack = useCallback(() => dispatch({type:TypeOperation.back}),[dispatch])

  /* 执行前进 */
  const execGo = useCallback(() => dispatch({type:TypeOperation.go}),[dispatch])

  /* 设置值 */
  const set = useCallback((newData:T) => dispatch({type:TypeOperation.set,newPresent:newData}),[dispatch])

  /* 重置 */
  const reset = useCallback((newData:T) => dispatch({type:TypeOperation.reset,newPresent:newData}),[dispatch])

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
