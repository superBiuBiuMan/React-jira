import React from "react";
import {Link, Navigate} from "react-router-dom";
import {Route,Routes} from "react-router";
import KanbanScreen from "../kanban";
import EpicScreen from "../epic";
const ProjectScreen = () => {

 return (
     <div>
      <h1>ProjectScreen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
       <Routes>
         <Route path={'kanban'} element={<KanbanScreen/>}></Route>
         <Route path={'epic'} element={<EpicScreen/>}></Route>
         <Route path={''} element={<Navigate to={'kanban'}/>}/>
        </Routes>
     </div>
 )
}


export default ProjectScreen
