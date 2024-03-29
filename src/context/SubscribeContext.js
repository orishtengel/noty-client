import { Alert, Stack } from '@mui/material'
import React from 'react'
import SubscribeApi from '../api/SubscribeApi'
import EventBus from '../eventbus/EventBus'

const defaultState = {
    idWebsite: '',
    username: '',
    date: '',
    startTime:'',
    endTime: '',
    frequncy:'',
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_SUBSCRIBE':
            return {...state , idWebsite: action.data.idWebsite, 
                               username: action.data.username, date: action.data.date,
                               startTime: action.data.startTime,
                               endTime: action.data.endTime, frequncy: action.data.frequncy}
        default:
            return state
    }
} 

export const SubscribeContextStore = React.createContext(defaultState)

const SubscribeContext = (props) => {
    
    const [state,dispatch] = React.useReducer(reducer,defaultState)
    const addSubscribe = async (data) => {
        
        const resp = await SubscribeApi.addSubscribe(data)
        
        if (resp.ok) {
            EventBus.publish('SHOW_ALERT',"success, You are now Subscribed")
        }
        else {
            if(!resp.ok)
                EventBus.publish('SHOW_ALERT',"error,Error in unsubscribing")
        }
        return resp
    }

    return (
        <SubscribeContextStore.Provider value={{...state, dispatch, addSubscribe}}>
            {props.children}
        </SubscribeContextStore.Provider>
    )
}

export default SubscribeContext