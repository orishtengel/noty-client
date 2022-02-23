import logo from './logo.svg';
import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { Login } from './componetns/login/Login';
import { Signup } from './componetns/signup/Signup';
import SessionContext from './context/SessionContext';
import './config_firebase/ConfigFirebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useEffect } from 'react';
import { HomeScreen } from './componetns/homescreen/HomeScreen';



function App() {

  const [auth,setAuth] = React.useState(false || window.localStorage.getItem("auth") == true)

  if (auth) {
    
  }

  useEffect(() =>{
    firebase.auth().onAuthStateChanged((userCred) => {
      if(userCred) {
        setAuth(true)
        window.localStorage.setItem("auth","true")
      }
    })
  })

  return (<>
    <Router>
      <SessionContext>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<HomeScreen/>}/>
        </Routes>
      </SessionContext>
      </Router>
  </>
    
  )
}

export default App;
