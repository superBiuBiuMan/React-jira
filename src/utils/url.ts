import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import {cleanEmptyObj} from "./index";
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
