import React from 'react';
import UnAuthenticated from "./pages/unAuthenticated";
import Authenticated from "./pages/authenticated";
import {useAuth} from "./context/authContext";
import './App.css';
import {Boundary} from "./component/errorBoundary";
import {FullErrorFallBack} from "./component/lib";


function App() {
  const {userInfo} = useAuth();
  /*测试错误*/
  return (
        <div className='App'>
          <Boundary fallBackRender={FullErrorFallBack}>
            {
              userInfo && Object.keys(userInfo).length ? <Authenticated/> : <UnAuthenticated/>
            }
          </Boundary>
        </div>
  );
}

export default App;
