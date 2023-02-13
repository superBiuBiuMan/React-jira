import {useEffect, useRef, useState} from "react";

/*判断是否为布尔值*/
export const isFalse = (value:any):boolean => value === 0 ? false : !value;

export const isVoid = (value:unknown) => value === undefined || value == null || value === '';

/*清除空对象*/
export const cleanEmptyObj = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

/*只在初次挂载执行*/
export const useMount = (callback:Function) => {
  useEffect(() => {
    callback();
    // todo 依懒项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

/* 网页标题更改 */
export const useDocumentTitle = (title:string,keepOnUnmount:boolean = true) => {
  //获取旧标题
  const oldTitle = useRef(document.title).current;
  //更改新标题(副作用,使用需要使用useEffect)
  useEffect(() => {
    document.title = title;
    return () => {
      if(!keepOnUnmount) {
        //卸载的时候执行
        document.title = oldTitle
      }
    }
  },[title,keepOnUnmount,oldTitle]);
}
