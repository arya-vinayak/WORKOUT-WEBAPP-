
import { useState } from "react"
//import { json } from "react-router-dom"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


const WorkoutForm = ()=>{

    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])


    const handleSubmit = async(e)=>
    {
        e.preventDefault()//to prevent the default refreshing of the page

        const workout = {title,load,reps}

        const response = await fetch('/api/workouts',{
            method:"POST",
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await response.json()//converting the response to a json file

        if(json.error)
        {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if(response.ok)
        {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log("Succesfully added the new workout",json)
            dispatch({type :'CREATE_WORKOUT',payload:json})
        }

    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Excercise Title</label>
            <input
            type = 'text'
            onChange = {(e)=>{setTitle(e.target.value)}}
            value = {title}
            className = {emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load(in Kg)</label>
            <input
            type = 'text'
            onChange = {(e)=>{setLoad(e.target.value)}}
            value = {load}
            className = {emptyFields.includes('load') ? 'error' : ''}
            />

            <label>No of Reps</label>
            <input
            type = 'number'
            onChange = {(e)=>{setReps(e.target.value)}}
            value = {reps}
            className = {emptyFields.includes('reps') ? 'error' : ''}
            />
            
            <button>Create workout</button>
            {error && <div className="error">{error}</div>}

        </form>
    )

}


export default WorkoutForm