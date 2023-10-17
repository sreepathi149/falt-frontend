import Map from "../maps/Map-data";
import {useSelector} from 'react-redux'
import jwtDecode from "jwt-decode";
import ClientsLocation from "../maps/Client-location";
import AgentLocation from "../maps/Agents-location";
import { Tab, Tabs } from "react-bootstrap";
import { useEffect } from "react";

const TrackClient = () => {
  const data = useSelector((state) => {
    return state.data.data
  })

  const tokenData = jwtDecode(localStorage.getItem('token'))
  const clientLocationsA = data.tasks.filter(task => task.location)
  console.log(clientLocationsA, "client")

  const clientLocationsM = data.tasks.filter(task => task.location && task.assignedBy === tokenData.id)
  const clientLocationsF = data.tasks.filter(task => task.location && task.assignedTo === tokenData.id)

  const employeeLocationsA = data.employees.filter(emp => emp.location.length > 0)
  const employeeLocationsM = data.employees.filter(emp => emp.role === "fieldAgent" && emp.reportTo === tokenData.id && emp.location.length > 0)
    console.log(clientLocationsA, 'ccc')
    return (
        <section className="mt-2">
          <div className=" container mt-2">
                <Tabs defaultActiveKey="Both" id="uncontrolled-tab-example" className="mb-1">
                    <Tab eventKey="Both" title="Both">
                      <div className="mt-3 mb-5">
                        <h3> Locations </h3>
                        {tokenData.role === 'admin' ? <Map clients={clientLocationsA} employees={employeeLocationsA}/> : null }
                        {tokenData.role === 'manager' ? <Map clients={clientLocationsM} employees={employeeLocationsM}/> : null }
                        {tokenData.role === 'fieldAgent' ? <Map clients={clientLocationsF}/> : null }
                      </div>
                    </Tab>
                    <Tab eventKey="Clients" title="Clients">
                      <div className="mt-3">
                        <h3> Locations </h3>
                        {tokenData.role === 'admin' ? <ClientsLocation clients={clientLocationsA} /> : null }
                        {tokenData.role === 'manager' ? <ClientsLocation clients={clientLocationsM} /> : null }
                      </div>
                    </Tab>  
                    {tokenData.role === 'fieldAgent' ? null : <Tab eventKey="Agents" title="Agents">
                      <div className="mt-3">
                        <h3> Locations </h3>
                        {tokenData.role === 'admin' ? <AgentLocation  employees={employeeLocationsA}/> : null }
                        {tokenData.role === 'manager' ? <AgentLocation  employees={employeeLocationsM}/> : null }
                      </div>
                    </Tab>}
                </Tabs>   
                  

            </div>
          
        </section>
    )
} 

export default TrackClient