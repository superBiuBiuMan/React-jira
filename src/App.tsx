import React,{lazy,Suspense} from 'react';
import {useAuth} from "./context/authContext";
import './App.css';
import {Boundary} from "./component/errorBoundary";
import {FullErrorFallBack, FullPageLoading} from "./component/lib";
//import UnAuthenticated from "./pages/unAuthenticated";
//import Authenticated from "./pages/authenticated";

const UnAuthenticated = lazy(() => import("./pages/unAuthenticated"))
const Authenticated = lazy(() => import("./pages/authenticated"))

function App() {
  const {userInfo} = useAuth();
  /*测试错误*/
  return (
    <div className='App'>
      <Boundary fallBackRender={FullErrorFallBack}>
        <Suspense fallback={FullPageLoading}>
          {
            userInfo && Object.keys(userInfo).length ? <Authenticated/> : <UnAuthenticated/>
          }
        </Suspense>
      </Boundary>
    </div>
  );
}

export default App;
