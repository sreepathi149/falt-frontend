const initialState = {
    data:{
        employees:[],
        clients:[],
        categories:[],
        tasks:[]
    },
    errors:{},
    isLoading: true
}


const dataReducer =  (state=initialState, action) => {
    switch(action.type) {
    //  <---------------- Employee ---------------->
        case 'SET_EMPLOYEES' : {
            return {...state, data: {...state.data, employees: action.payload}}
        }
        case 'ADD_EMPLOYEE' : {
            return {...state, data: {...state.data, employees:[...state.data.employees, action.payload]}}
        }
        case 'EDIT_EMPLOYEE' : {
            return {...state, data: {...state.data, employees:state.data.employees.map((emp) => {
                if(emp._id === action.payload._id) {
                    return {...emp, ...action.payload}
                } else {
                    return {...emp}
                }
            })}}
        }
        case 'DEL_EMPLOYEE' : {
            return {...state, data: {...state.data, employees: state.data.employees.filter(emp => emp._id !== action.payload)}}
        }
    //  <---------------- Tasks ---------------->
        case 'SET_TASKS' : {
            return {...state, data: {...state.data, tasks: action.payload}}
        }
        case 'ADD_TASK' : {
            return {...state, data: {...state.data, tasks:[...state.data.tasks, action.payload]}}
        }
        case 'EDIT_TASK' : {
            return {...state, data: {...state.data, tasks:state.data.tasks.map((task) => {
                if(task._id === action.payload._id) {
                    return {...task, ...action.payload}
                } else {
                    return {...task}
                }
            })}}
        }
        case 'FILE_UPLOADS' : {
            return {...state, data: {...state.data, tasks:state.data.tasks.map((task) => {
                if(task._id === action.payload._id) {
                    return {...task, ...action.payload}
                } else {
                    return {...task}
                }
            })}}
        }
        case 'DEL_TASK' : {
            return {...state, data: {...state.data, tasks: state.data.tasks.filter(task => task._id !== action.payload)}}
        }
    //  <---------------- Client ---------------->
        case 'SET_CLIENTS' : {
            return {...state, data: {...state.data, clients: action.payload}}
        }
        case 'ADD_CLIENT' : {
            return {...state, data: {...state.data, clients:[...state.data.clients, action.payload]}}
        }
        case 'EDIT_CLIENT' : {
            return {...state, data: {...state.data, clients:state.data.clients.map((client) => {
                if(client._id === action.payload._id) {
                    return {...client, ...action.payload}
                } else {
                    return {...client}
                }
            })}}
        }
        case 'DEL_CLIENT' : {
            return {...state, data: {...state.data, clients: state.data.clients.filter(client => client._id !== action.payload)}}
        }
    //  <---------------- Category ---------------->
        case 'SET_CATEGORIES' : {
            return {...state, data: {...state.data, categories: action.payload}}
        }
        case 'ADD_CATEGORY' : {
            return {...state, data: {...state.data, categories:[...state.data.categories, action.payload]}}
        }
        case 'EDIT_CATEGORY' : {
            return {...state, data: {...state.data, categories:state.data.categories.map((cat) => {
                if(cat._id === action.payload._id){
                    return {...cat, ...action.payload}
                } else {
                    return {...cat}
                }
            })}}
        }
        case 'DEL_CATEGORY' : {
            return {...state, data: {...state.data, categories: state.data.categories.filter(category => category._id !== action.payload)}}
        }
        
        default:{
            return {...state}
        }
    }
}

export default dataReducer