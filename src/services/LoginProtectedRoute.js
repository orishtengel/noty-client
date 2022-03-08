import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import SessionService from '../services/SessionService'


export const LoginProtectedRoute = ({children, ...rest}) => {

    return (
        <Route exact {...rest}
          render={({ location }) => SessionService.isLoggedIn() ? (children) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />)
}