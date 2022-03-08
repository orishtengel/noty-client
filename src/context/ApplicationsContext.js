import React from 'react'
import ApplicationsApi from '../api/ApplicationsApi'

const defaultState = {
    applications : ''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_APPLICATIONS':
            return {...state , applications: action.data.applications}
        default:
            return state
    }
} 

export const ApplicationsContextStore = React.createContext(defaultState)

const ApplicationsContext = (props) => {
    const [state,dispatch] = React.useReducer(reducer,defaultState)

    const loadApplications = async () => {
        const resp = await ApplicationsApi.getApplications()
        if (resp.ok) {
            dispatch({type:'SET_APPLICATIONS', data: {applications: resp.data.data}})
        }
        return resp
    }
    
    return (
        <ApplicationsContextStore.Provider value={{...state, dispatch, loadApplications}}>
            {props.children}
        </ApplicationsContextStore.Provider>
    )
}

export default ApplicationsContext