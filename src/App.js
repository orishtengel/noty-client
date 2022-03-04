import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Login } from './componetns/login/Login';
import { Signup } from './componetns/signup/Signup';
import SessionContext, { SessionContextStore } from './context/SessionContext';
import './config_firebase/ConfigFirebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import { useEffect } from 'react';
import { HomeScreen } from './componetns/homescreen/HomeScreen';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { LoginProtectedRoute } from './services/LoginProtectedRoute';
import { AppBarNoty } from './componetns/appbar/AppBarNoty';
import ApplicationsContext, { ApplicationsContextStore } from './context/ApplicationsContext';
import SubscribeContext from './context/SubscribeContext';
import { LoadingScreen } from './componetns/loading/LoadingScreen';
import { Alerts } from './componetns/alerts/Alerts';

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
  
  return (<>
  <ThemeProvider theme = {theme}>
    <Alerts />
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
            <ApplicationsContext>
              <AppBarNoty/>
              <SubscribeContext>
              <HomeScreen/>
              </SubscribeContext>
            </ApplicationsContext>
          </LoginProtectedRoute>
        </Switch>
      </SessionContext>
    </Router>
    </ThemeProvider>
  </>
    
  )
}

export default App;
