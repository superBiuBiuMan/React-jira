import {useMemo, useState} from "react";
import {useUrlQueryParams} from "../../utils/url";

export const useProjectsSearchParams = () => {
  /*搜索参数*/
  const [keys] = useState<('name' | 'personId')[]>(['name','personId'])
  const [params,setParams] = useUrlQueryParams(keys);

  return [
        useMemo(() => ({ ...params,personId:Number(params.personId) || undefined }),[params]),
        setParams
    ] as const
}
