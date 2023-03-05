import {createSlice} from "@reduxjs/toolkit";

export const projectListSlice = createSlice({
  name:'projectListSlice',
  initialState:{
    projectModalOpen:false,
  },
  reducers:{
    /* 开启对话框 */
   openProjectModal(state){
     //immer帮我们处理了,所以我们可以直接在返回的state书写
     state.projectModalOpen = true;
   },
    /* 关闭对话框 */
   closeProjectModal(state){
     state.projectModalOpen = false;
   }
  }
})

export const projectListSliceReducer = projectListSlice.reducer;
export const projectListSliceActions = projectListSlice.actions;
//获取state,从store当中的reducer获取值
export const selectProjectModalOpen = (state) => state.projectList.projectModalOpen;


