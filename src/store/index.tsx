import {configureStore} from "@reduxjs/toolkit";
import {projectListSliceReducer} from "../pages/projectList/projectList.slice";

export const store = configureStore({
  /* 设置状态管理 */
  reducer:{
    projectList:projectListSliceReducer
  },
})
