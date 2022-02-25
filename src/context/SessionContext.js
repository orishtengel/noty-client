import React from 'react'
import ls from 'local-storage'
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app'
import 'firebase/auth'


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
    const history = useHistory()

    const login = async (username, password) => {
        const resp = await firebase.auth().signInWithEmailAndPassword(username,password)
        if(resp) {
            ls.set("token",await resp.user.getIdToken())
            dispatch({type: 'SET_USER', data: { email: username }})
            history.push('/')
        }
        return resp
    }
    const signup = async (username, password) => {
        const resp = await firebase.auth().createUserWithEmailAndPassword(username,password)
        if(resp) {
            console.log(resp)
            dispatch({type: 'SET_USER', data: { email: username }})
            ls.set('token', await resp.user.getIdToken())
            history.push('/')
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
        history.push('/login')
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