import React from 'react'
import ls from 'local-storage'
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/auth'
import AuthApi from '../api/AuthApi';
import reactRouterDom from 'react-router-dom';
import SessionService from '../services/SessionService';
import EventBus from '../eventbus/EventBus';


const defaultState = {
    email: '',
    name: '',
    phone: '',
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {...state, email: action.data.email, name: action.data.name, phone:action.data.phone}
        default:
            return state;
    }
}

export const SessionContextStore = React.createContext(defaultState)

const SessionContext = (props) => {
    const [state, dispatch] = React.useReducer(reducer, defaultState)
    const history = useHistory()

    React.useEffect(() => {
        if(ls.get('logged')) {
            loadUser()
        }
    },[])

    const login = async (username, password) => {
        try {
            const resp = await firebase.auth().signInWithEmailAndPassword(username,password)
            if (resp) {
                ls.set("token",await resp.user.getIdToken())
                const respUser = await AuthApi.getUser()
                    if(respUser.ok) {
                        ls.set("logged", true)
                        dispatch({type: 'SET_USER', data: { email: username, name: respUser.data.data.name, phone: respUser.data.data.phone }})
                        history.push('/')
                    }
                    else {
                        ls.remove("token")
                        EventBus.publish('SHOW_ALERT','error,user dont exist')
                    }
                }
            }
        catch (err) {
            if (err.code === 'auth/user-not-found')
                EventBus.publish('SHOW_ALERT','error,user Unauthorized')
            else 
                history.push('/')
        }
    }

    const signup = async (username, password) => {
        try {
        const resp = await firebase.auth().createUserWithEmailAndPassword(username,password)
        if(resp) {
            ls.set('token', await resp.user.getIdToken())}
        return resp
        }
        catch (err) {
            if (err.code === 'auth/email-already-in-use')
                EventBus.publish('SHOW_ALERT','error,user already in use')
        }
    }

    const createUser = async (username, name, phone) => {
        const resp = await AuthApi.createUser(username,name,phone)
        if(resp.ok) {
            dispatch({type: 'SET_USER', data: { email: username, name: name, phone: phone }})
            history.push('/')
        }
        return resp
    }

    const loadUser = async () => {
        if(SessionService.isLoggedIn()) {
            let resp = await AuthApi.getUser()
            if (resp.ok) {
                dispatch({type: 'SET_USER', data: { email: resp.data.email, name: resp.data.name }})
            }
        }
    }

    const logout = () => {
        history.push('/login')
        ls.remove('token')
        ls.remove('logged')
        dispatch({type: 'SET_USER', data: { email:'', name: '', phone:''}})
    }


    return (
        <SessionContextStore.Provider value={{...state, dispatch, login, signup, logout,createUser}}>
            {props.children}
        </SessionContextStore.Provider>
    )
}

export default SessionContext