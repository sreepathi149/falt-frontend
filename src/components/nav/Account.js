import {Tab, Tabs} from "react-bootstrap"
import Profile from "../data/profile.data"
import Settings from "./Settings"
import jwtDecode from "jwt-decode"

const Account = () => {
    const tokenData = jwtDecode(localStorage.getItem('token'))

    return (
        <section>
            <div className=" container mt-2">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-1">
                    <Tab eventKey="profile" title="Profile">
                        <Profile tokenData={tokenData} />
                    </Tab>
                    <Tab eventKey="setting" title="Settings">
                        <Settings tokenData={tokenData} />
                    </Tab>  
                </Tabs>   
            </div> 
           
        </section>
    )
}

export default Account