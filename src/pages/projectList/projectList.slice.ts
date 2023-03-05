import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
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
  },
  extraReducers:(builder) => {
    builder.addCase(getDataFromOtherAction.fulfilled, (state, action) => {
      // Add user to the state array
      //state.list = res.list //存储数据
    })
  }
})

export const projectListSliceReducer = projectListSlice.reducer;
export const projectListSliceActions = projectListSlice.actions;
//获取state,从store当中的reducer获取值
export const selectProjectModalOpen = (state) => state.projectList.projectModalOpen;


/* 测试异步-方法1 */
export const getDataFromOtherAction = createAsyncThunk('projectList/fetch',async () => {
  const source  = await fetch('https://api.oick.cn/lishi/api.php')
  return await source.json();//反应到payload参数当中
})
/* 其他地方调用即可,调用方式dispatch(getDataFromOtherAction()) */

