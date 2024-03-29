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
import SubscribesContext from './context/SubscribesContext';

import { LoadingScreen } from './componetns/loading/LoadingScreen';
import { Alerts } from './componetns/alerts/Alerts';
import { SubscribeScreen } from './componetns/subscribe_screen/SubscribeScreen';
import { Signup_new } from './componetns/signup/Signup_new';

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
    <LoadingScreen/>
    <Router>
      <SessionContext>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <Signup_new/>
          </Route>
            <ApplicationsContext>
              <AppBarNoty/>
              <SubscribesContext>
                <SubscribeContext>
                <LoginProtectedRoute path="/">
                  <HomeScreen/>
                </LoginProtectedRoute>
                <LoginProtectedRoute path="/MySubscribe">
                  <SubscribeScreen/>
                </LoginProtectedRoute>
                </SubscribeContext>
              </SubscribesContext>
            </ApplicationsContext>
        </Switch>
      </SessionContext>
    </Router>
    </ThemeProvider>
  </>
    
  )
}

export default App;
