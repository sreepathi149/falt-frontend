import { Route, Routes } from "react-router-dom"
import FreeTrail from "../nav/Free-trail"
import Login from "../nav/Login"
import VerifyLogin from "../nav/verify-otp"
import Contact from "../nav/Contact"
import Pricing from "../nav/Pricing"
import Account from "../nav/Account"
import EmployeeData from "../data/Employee-Data"
import Tracking from "../nav/Location-tracking"
import TaskManagement from "../nav/Task Management"
import CCData from "../data/CC-data"
import ResetPassword from "../nav/Reset-password"
import ForgotPassword from "../nav/Forgot-password"
import UploadsData from "../data/Uploads-data"
import ViewClient from "../maps/View-client"
import Employee from "../data/Employee"
import { Suspense, lazy } from "react"
import UpdateUser from "../edit-forms/user-edit"
import UpdateCompany from "../edit-forms/update-company"
import Register from "../nav/register"
const Dashboard = lazy(() => import('../nav/Dashboard'))
const Home = lazy(() => import('../nav/Home'))


const AppRoutes = () => {
    
    return (
        <div>
            <Routes>
                {localStorage.getItem('token') ? <Route path="/" element={<Suspense fallback = {<div>Dashboard is loading please wait...</div>}><Dashboard/></Suspense>}  />
                :<Route path="/" element={<Suspense fallback = {<div>Home Page is loading please wait...</div>}><Home /></Suspense>}  /> }
                <Route path="/free-trail" element={<Register />} exact={true}/>
                <Route path="/login" element={<Login />} />
                <Route path="/verify-login" element={<VerifyLogin />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/account" element={<Account />} />
                <Route path="/employees" element={<EmployeeData />} />
                <Route path="/location-tracking" element={<Tracking />} />
                <Route path="/task-management" element={<TaskManagement />} />
                <Route path="/clients-categories" element={<CCData />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/field-uploads" element={<UploadsData />} />
                <Route path="/update-user" element={<UpdateUser />} />
                <Route path="/update-company" element={<UpdateCompany />} />
                <Route path="/view-client/:taskId" element={<ViewClient />} />
                <Route path="/employee/:employeeId" element={<Employee />} />
            </Routes>
        </div>
    )
}

export default AppRoutes