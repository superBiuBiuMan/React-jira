import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {useEffect, useMemo} from "react";
import {cleanEmptyObj} from "./index";
import {useRef} from "react";
/*
*   返回页面当中url,指定的键值对的
* */

export const useUrlQueryParams = <K extends string>(keys:K[]) => {
  const [searchParams,setSearchParams] = useSearchParams();
  return [
      useMemo(() => {
        return keys.reduce((pre,key) => {
          return {...pre,[key]:searchParams.get(key) ?? ''}
        },{} as {[key in K]:string})
      },[searchParams]),
     (params:Partial<{[key in K] : unknown}>) => {
       //console.log('啊啊',params,searchParams,Object.fromEntries(searchParams))
        const o = cleanEmptyObj({...Object.fromEntries(searchParams),...params}) as URLSearchParamsInit
       return setSearchParams(o);
     }
  ] as const
}

/*
*  返回组件的状态,如果没有挂载或者已经卸载,则返回false,
* */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;//组件卸载
    }
  })
  return mountedRef
}
