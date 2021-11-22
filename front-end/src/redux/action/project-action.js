import { GET_ALL ,ADD_PROJECT,DELETE_PROJECT,UPDATE_PROJECT} from "../action-types/project-actiontype";
import axios from 'axios'


export const getHandler= () => async(dispatch)=>{
   await
    axios.get('https://mern-freelancer-app.herokuapp.com/api/auth/client/project/all')
    .then((res)=>
    dispatch({
        type:GET_ALL,
        payload:res.data
    })

    ).catch((error)=>console.log(error))
}


export const addHandler = (newProject)=>async(dispatch)=>{
    await
    axios.post('https://mern-freelancer-app.herokuapp.com/api/auth/client/project/add',newProject)
    .then((res)=>dispatch(getHandler()))
    .catch((error)=>console.log(error))
}

export const deleteHandler =(id)=>async(dispatch)=>{
    await
    axios.delete(`https://mern-freelancer-app.herokuapp.com/api/auth/client/project/delete/${id}`)
    .then((res)=>dispatch(getHandler()))
    .catch((error)=>console.log(error))
}


export const editHandler =(id,project)=>async(dispatch)=>{
    await
    axios.put(`https://mern-freelancer-app.herokuapp.com/api/auth/client/project/edit/${id}`,project)
    .then((res)=>dispatch(getHandler()))
    .catch((error)=>console.log(error))
}