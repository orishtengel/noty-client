import { Alert, Stack } from '@mui/material'
import React from 'react'
import SubscribeApi from '../api/SubscribeApi'

const defaultState = {
    keyWebsite: '',
    username: '',
    date: '',
    startTime:'',
    endTime: '',
    frequncy:''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_SUBSCRIBE':
            return {...state , keyWebsite: action.data.keyWebsite, 
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

    const addSubscribe = async (keyWebsite, username, date ,startTime, endTime, frequncy) => {
        const resp = await SubscribeApi.addSubscribe(keyWebsite,username, date, startTime, endTime, frequncy)
        console.log(resp)
        if (resp.ok) {
            return(<>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="success"> Subscribe successfully! </Alert>
                </Stack>
            </>)
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