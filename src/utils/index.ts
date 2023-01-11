import { useEffect, useState } from "react";

/*判断是否为布尔值*/
export const isFalse = (value:any):boolean => value === 0 ? false : !value;

/*清除空对象*/
export const cleanEmptyObj = (obj:any) => {
  const temp = {...obj};
  Object.keys(temp).forEach(key => {
    const value = temp[key]
    if(isFalse(value)){
      delete temp[key]
    }
  })
  return temp;
}

/*只在初次挂载执行*/
export const useMount = (callback:Function) => {
  useEffect(() => {
    callback();
  },[])
}
/*自定义防抖hooks*/
export const useDebounce = <T>(value:T,delay?:number):T => {
  const [debounceValue,setDebounceValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => { setDebounceValue(value) },delay);
    return () => {
      /*下一次effect执行前的处理*/
      clearTimeout(timer)
    }
  },[value,delay])
  return debounceValue;
}
