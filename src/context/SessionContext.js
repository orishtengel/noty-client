import React from 'react'
import AuthApi from '../api/AuthApi';
import ls from 'local-storage'
import SessionService from '../services/SessionService';
import { useNavigate } from 'react-router-dom';


const defaultState = {
    email: '',
    user: '',
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {...state, email: action.data.email, user: action.data.user}
        default:
            return state;
    }
}

export const SessionContextStore = React.createContext(defaultState)

const SessionContext = (props) => {
    const [state, dispatch] = React.useReducer(reducer, defaultState)
    const navigate = useNavigate()

    const login = async (username, password) => {
        let resp = await AuthApi.login(username, password)
        if(resp.ok) {
            dispatch({type: 'SET_USER', data: { email: username, user: resp.data.user }})
            ls.set('token', resp.data.token)
            navigate.push('/')
        }
        return resp
    }
    const signup = async (username, password) => {
        let resp = await AuthApi.signup(username, password)
        if(resp.ok) {
            dispatch({type: 'SET_USER', data: { email: username, user: resp.data.user }})
            ls.set('token', resp.data.token)
            navigate.push('/')
        }
        return resp
    }

    // const facebookLogin = async (status) => {
    //     let resp = await AuthApi.facebookLogin(status.email, status.name, `https://graph.facebook.com/${status.userID}/picture?width=200&height=200`)//status.picture.data.url)
    //     if(resp.ok) {
    //         loadAllUsers()
    //         dispatch({type: 'SET_USER', data: { email: status.email, user: resp.data.user }})
    //         ls.set('token', resp.data.token)
    //         history.push('/')
    //     }
    // }

    const logout = () => {
        navigate.push('/login')
        ls.remove('token')
        dispatch({type: 'SET_USER', data: { email:'', user: ''}})
    }


    return (
        <SessionContextStore.Provider value={{...state, dispatch, login, signup, logout}}>
            {props.children}
        </SessionContextStore.Provider>
    )
}

export default SessionContext