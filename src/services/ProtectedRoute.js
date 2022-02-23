import React from 'react'
import { Navigate, Redirect, Route } from 'react-router-dom'
import SessionService from './SessionService'


export const LoginProtectedRoute = ({children, ...rest}) => {

    return (
        <Route {...rest}
          render={({ location }) => SessionService.isLoggedIn() ? (children) : (
              <Navigate
                to={{
                  pathname: "/login",
                  state: { from: location }
                }}
              />
            )
          }
        />)
}