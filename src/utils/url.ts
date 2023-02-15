import {useSearchParams} from "react-router-dom";
import {useMemo} from "react";
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
       setSearchParams,
  ] as const
}
