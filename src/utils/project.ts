import {useAsync} from "./useAsync";
import {useCallback, useEffect} from "react";
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
  const fetchProjects = useCallback(() => client('projects',{data:cleanEmptyObj(params)}),[client,params])
  useEffect( () => {
    run(fetchProjects(),{
      retry:fetchProjects
    })
  },[params,run,fetchProjects])

  return result;
}

/* 编辑 */
export const useEditProject = () => {
  const { run,...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params:Partial<ListData>) => {
    return run(client(`projects/${params.id}`,{
      data:params,
      method:'PATCH',
    }))
  }
  return {
    mutate,
    ...asyncResult,
  }
}
/*添加*/
export const useAddProject = () => {
  const { run,...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params:Partial<ListData>) => {
    return run(client(`projects/${params.id}`,{
      data:params,
      method:'POST',
    }))
  }
  return {
    mutate,
    ...asyncResult,
  }
}
