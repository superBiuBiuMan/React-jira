import {useAsync} from "./useAsync";
import {useEffect} from "react";
import {cleanEmptyObj} from "./index";
import {ListData, Params} from "../pages/projectList";
import {useHttp} from "./http";

export const useProject = (params?:Partial<Params>) => {
  /*请求数据-携带token*/
  const client = useHttp();
  /*请求数据-带loading和error*/
  const {run,...result} = useAsync<ListData[]>();
  /*
  *  当搜索条件发生变化的时候,就更新
  * */
  useEffect( () => {
    run(client('projects',{data:cleanEmptyObj(params)}))
    //// todo 依懒项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params])

  return result;
}
