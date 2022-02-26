import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Login } from './componetns/login/Login';
import { Signup } from './componetns/signup/Signup';
import SessionContext from './context/SessionContext';
import './config_firebase/ConfigFirebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useEffect } from 'react';
import { HomeScreen } from './componetns/homescreen/HomeScreen';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { LoginProtectedRoute } from './services/LoginProtectedRoute';
import { AppBarNoty } from './componetns/appbar/AppBarNoty';
import CoursesContext from './context/CoursesContext';

const theme = createTheme({
  palette: {
    primary: {
      main: "#019d01",
    },
    secondary: {
        main: '#ffffff'
    }
  },
});

function App() {

  const [auth,setAuth] = React.useState(false || window.localStorage.getItem("auth") == true)

  // useEffect(() =>{
  //   firebase.auth().onAuthStateChanged((userCred) => {
  //     if(userCred) {
  //       setAuth(true)
  //       window.localStorage.setItem("auth","true")
  //     }
  //   })
  // })

  return (<>
  <ThemeProvider theme = {theme}>
    <Router>
      <SessionContext>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
          <LoginProtectedRoute path="/">
            <CoursesContext>
              <AppBarNoty/>
              <HomeScreen/>
            </CoursesContext>
          </LoginProtectedRoute>
        </Switch>
      </SessionContext>
    </Router>
    </ThemeProvider>
  </>
    
  )
}

export default App;
