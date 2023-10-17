import { createContext, useEffect, useReducer } from "react"
import NavBar from "./components/nav/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css'
import { getEmployees } from "./components/redux/actions/employee-actions"
import { getTasks } from "./components/redux/actions/tasks-actions"
import { getCategories, getClients } from "./components/redux/actions/CC-actions"
import { useDispatch } from "react-redux"
import AppRoutes from "./components/routes/AppRoutes"

export const UserContext = createContext()

const reducer = (state, action) => {
  switch(action.type) {
    case "SET_DATA" : {
        return {...state, user: action.payload.user, employee: action.payload.employee, company:action.payload.company, tokenData:action.payload.tokenData}
    }
    case "EDIT_USER" : {
      return {...state, user: {...state.user, ...action.payload}}
    }
    case "EDIT_COMPANY" : {
      return {...state, company: {...state.company, ...action.payload}}
    }
    default: {
      return {...state}
    }
  }
}

const App = () => {
  const Dispatch = useDispatch()
  const [state, dispatch] = useReducer(reducer, {user:{}, company:{}, employee:{}, tokenData:{}})
  useEffect(() => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : ""
    if(token) {
      Dispatch(getEmployees())
      Dispatch(getCategories())
      Dispatch(getClients())
      Dispatch(getTasks())
    }
  }, [Dispatch])
  return (
    <div >
      <UserContext.Provider value={{state, dispatch}}>
      
        <NavBar />
        <AppRoutes />

      </UserContext.Provider>
    </div>
  )
}

export default App