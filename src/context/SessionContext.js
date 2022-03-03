import React from 'react'
import ls from 'local-storage'
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/auth'
import AuthApi from '../api/AuthApi';
import reactRouterDom from 'react-router-dom';
import SessionService from '../services/SessionService';


const defaultState = {
    email: '',
    user: '',
    phone: '',
    color: ''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {...state, email: action.data.email, user: action.data.user, phone:action.data.phone, color: action.data.color}
        default:
            return state;
    }
}

export const SessionContextStore = React.createContext(defaultState)

const SessionContext = (props) => {
    const [state, dispatch] = React.useReducer(reducer, defaultState)
    const history = useHistory()

    React.useEffect(() => {
        loadUser()
    },[])

    const login = async (username, password) => {
        const resp = await firebase.auth().signInWithEmailAndPassword(username,password)
        if(resp) {
            const user = await AuthApi.getUser()
            if (user) {
                ls.set("token",await resp.user.getIdToken())
                dispatch({type: 'SET_USER', data: { email: username, user: user.data.name, phone: user.data.phone, color:user.data.color }})
                history.push('/')
            }
        }
        return resp
    }

    const signup = async (username, password) => {
        const resp = await firebase.auth().createUserWithEmailAndPassword(username,password)
        if(resp) {
            ls.set('token', await resp.user.getIdToken())        }
        return resp
    }

    const createUser = async (username, name, phone) => {
        const resp = await AuthApi.createUser(username,name,phone)
        if(resp.ok) {
            dispatch({type: 'SET_USER', data: { email: username, user: name, phone: phone }})
            history.push('/')
        }
        return resp
    }

    const loadUser = async () => {
        if(SessionService.isLoggedIn()) {
            let resp = await AuthApi.getUser()
            if (resp.ok) {
                dispatch({type: 'SET_USER', data: { email: resp.data.email, user: resp.data }})
            }
        }
    }

    const logout = () => {
        history.push('/login')
        ls.remove('token')
        dispatch({type: 'SET_USER', data: { email:'', user: ''}})
    }


    return (
        <SessionContextStore.Provider value={{...state, dispatch, login, signup, logout,createUser}}>
            {props.children}
        </SessionContextStore.Provider>
    )
}

export default SessionContext