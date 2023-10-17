import axios from 'axios'

export const getTasks = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://falt.onrender.com/api/tasks', {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response)
            dispatch(setTasks(response.data))
        } catch(e) {
            console.log(e.message)
        }
    }
}

const setTasks = (data) => {
    return {type: "SET_TASKS", payload: data}
}

export const taskDelete = (id) => {
    return async (dispatch) => {
        try {
            console.log(id)
            const response = await axios.delete(`https://falt.onrender.com/api/tasks-delete/${id}`, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response)
            dispatch(delTask(response.data._id))
        } catch(e) {
            alert(e.message)
        }
    }
}

const delTask = (id) => {
    return {type: "DEL_TASK", payload: id}
}

export const taskEdit = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`https://falt.onrender.com/api/tasks-update/${data.id}`, data, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            if(response.data.hasOwnProperty("_id")) {
                dispatch(editTask(response.data))
                alert('successfully updated an Employee')  
            }
        } catch(e) {
        alert(e.message)
        }
    }
}

const editTask = (data) => {
    return {type: "EDIT_TASK", payload: data}
}

export const taskAdd = (data, resetForm) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('https://falt.onrender.com/api/tasks/create', data, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response.data)
            dispatch(addTask(response.data))
            alert('successfully added Task') 
            resetForm() 
          } catch(e) {
            alert(e.message)
          }
    }
}

const addTask = (data) => {
    return {type: "ADD_TASK", payload: data}
}


export const fieldUploads = (id, formData) => {
    return async (dispatch) => {
        try {
            console.log(formData)
            const response = await axios.put(`https://falt.onrender.com/api/tasks-uploads/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'authorization': localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(fileUploads(response.data))
        } catch(e) {
            alert(e.message)
        }
    }
}

const fileUploads = (data) => {
    return {type: "FILE_UPLOADS", payload: data}
}