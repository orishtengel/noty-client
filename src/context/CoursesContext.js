import React from 'react'
import CoursesApi from '../api/CoursesApi'

const defaultState = {
    courses : []
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_COURSES':
            return {...state , courses: [...state.courses] + [action.data.courses]}
        default:
            return state
    }
} 

export const CoursesContextStore = React.createContext(defaultState)

const CoursesContext = (props) => {
    const [state,dispatch] = React.useReducer(reducer,defaultState)

    const loadCourses = async () => {
        const resp = await CoursesApi.getCourses()
        if (resp.ok) {
            console.log('dasda',resp)
            dispatch({type:'SET_COURSES', data: {courses: resp}})
        }
        return resp
    }
    return (
        <CoursesContextStore.Provider value={{...state, dispatch, loadCourses}}>
            {props.children}
        </CoursesContextStore.Provider>
    )
}

export default CoursesContext