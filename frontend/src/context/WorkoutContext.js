

//The entire purpose of the WorkoutContext that i have created is to keep the frontend 
//in sync with the database so that we need not go ahead and refresh the page in order
//to view the newly added workouts taken as input from our workout form

import {createContext,useReducer} from 'react'


export const WorkoutsContext = createContext()

export const workoutsReducer = (state,action)=>
{
    switch(action.type)
    {
        case 'SET_WORKOUTS':
            return{
                workouts : action.payload
            }

        case 'CREATE_WORKOUT':
            return{
                workouts:[action.payload,...state.workouts]
            }

        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter((w)=> w._id !== action.payload)
            }

        default:
            return state
    }


}

export const WorkoutsContextProvider = ({ children })=>
{
    const [state,dispatch] = useReducer(workoutsReducer,{
        workouts:null
    })
    return(
        <WorkoutsContext.Provider value = {{...state,dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}