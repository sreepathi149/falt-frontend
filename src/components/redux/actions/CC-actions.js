import axios from 'axios'

export const getCategories = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://falt.onrender.com/api/categories', {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response)
            dispatch(setCategories(response.data))
        } catch(e) {
            console.log(e.message)
        }
    }
}

const setCategories = (data) => {
    return {type: "SET_CATEGORIES", payload: data}
}

export const categoryDelete = (id) => {
    return async (dispatch) => {
        try {
            console.log(id)
            const response = await axios.delete(`https://falt.onrender.com/api/category-delete/${id}`, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response)
            dispatch(delCategory(response.data._id))
        } catch(e) {
            alert(e.message)
        }
    }
}

const delCategory = (id) => {
    return {type: "DEL_CATEGORY", payload: id}
}

export const categoryEdit = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`https://falt.onrender.com/api/category-update/${data.id}`, data, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            if(response.data.hasOwnProperty('_id')) {
                alert("Category updated successfully")
                dispatch(editCategory(response.data))
            }
        }catch(e) {
            alert(e.message)
        }
    }
    
}

const editCategory = (data) => {
    return {type: "EDIT_CATEGORY", payload: data}
}

export const categoryAdd = (data, resetForm) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('https://falt.onrender.com/api/category/create', data, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response.data)
            dispatch(addCategory(response.data))
            alert('successfully added Category')  
            resetForm()
          } catch(e) {
            alert(e.message)
          }
    }
}

const addCategory = (data) => {
    return {type: "ADD_CATEGORY", payload: data}
}

// <---------- CLIENTS ACTIONS ------------->

export const getClients = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('https://falt.onrender.com/api/clients', {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response)
            dispatch(setClients(response.data))
        } catch(e) {
            console.log(e.message)
        }
    }
}

const setClients = (data) => {
    return {type: "SET_CLIENTS", payload: data}
}

export const clientDelete = (id) => {
    return async (dispatch) => {
        try {
            //console.log(id)
            const response = await axios.delete(`https://falt.onrender.com/api/client-delete/${id}`, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response)
            dispatch(delClient(response.data._id))
        } catch(e) {
            alert(e.message)
        }
    }
}

const delClient = (id) => {
    return {type: "DEL_CLIENT", payload: id}
}

export const clientEdit = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`https://falt.onrender.com/api/client-update/${data.id}`, data, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            if(response.data.hasOwnProperty('_id')) {
                alert("Client details updated successfully")
                dispatch(editClient(response.data))
            }
        } catch(e) {
            alert(e.message)
        }
    }    
}

const editClient = (data) => {
    return {type: "EDIT_CLIENT", payload: data}
}

export const clientAdd = (data, resetForm) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('https://falt.onrender.com/api/client/register', data, {
                headers: {
                    'authorization' : localStorage.getItem('token')
                }
            })
            //console.log(response.data)
            dispatch(addClient(response.data))
            alert('successfully added Client')  
            resetForm()
          } catch(e) {
            alert(e.message)
          }
    }
}

const addClient = (data) => {
    return {type: "ADD_CLIENT", payload: data}
}