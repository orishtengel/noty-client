import { Alert, Stack } from '@mui/material'
import React from 'react'
import SubscribeApi from '../api/SubscribeApi'
import EventBus from '../eventbus/EventBus'

const defaultState = {
    subscribes: []
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOAD_SUBSCRIBES':
            return {...state, subscribes: action.data.subscribes}
        case 'DELETE_SUBSCRIBE': {
            return {...state, subscribes: Object.keys(state.subscribes).map(subscribe => {
                if(subscribe == action.data.idWebsite) {
                    delete state.subscribes[action.data.idWebsite]
                }
            }) }
        }
        default:
            return state
    }
} 

export const SubscribesContextStore = React.createContext(defaultState)

const SubscribesContext = (props) => {
    const [state,dispatch] = React.useReducer(reducer,defaultState)

    const getSubscriptions = async (apps) => {
        const arr = []
        await Promise.all(apps.map(async id => {
            const resp = await SubscribeApi.getSubscribeById(id)
            if(resp.ok) {
                arr.push(...Object.keys(resp.data.data).map(k => {
                    return  {subId: k, ...resp.data.data[k]}
                } 
                ))
            }
        }))
        
        dispatch({type: 'LOAD_SUBSCRIBES', data : { subscribes:  arr }})
    }
    const deleteSubscribe = async (idWebsite, idSubscribe) => {
        const resp = await SubscribeApi.deleteSubscribe(idWebsite, idSubscribe)
        if (resp.ok) {
            dispatch({type:'DELETE_SUBSCRIBE', data: {idSubscribe: idSubscribe}})
            EventBus.publish('SHOW_ALERT',"success,You are now Unsubscribed")
        }
        else {
            if(!resp.ok)
                EventBus.publish('SHOW_ALERT',"error,error in delete subscribe")
        }
        return resp
    }

    return (
        <SubscribesContextStore.Provider value={{...state, dispatch, deleteSubscribe, getSubscriptions}}>
            {props.children}
        </SubscribesContextStore.Provider>
    )
}

export default SubscribesContext