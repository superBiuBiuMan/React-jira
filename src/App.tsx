import React from 'react';
import UnAuthenticated from "./pages/unAuthenticated";
import Authenticated from "./authenticated";
import {useAuth} from "./context/authContext";
import './App.css';

function App() {
  const {userInfo} = useAuth();
  console.log(Object.keys(userInfo))
  return (
    <div className='App'>
      {
        Object.keys(userInfo).length ? <Authenticated/> : <UnAuthenticated/>
      }
    </div>
  );
}

export default App;
