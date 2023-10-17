import { Tab, Tabs } from "react-bootstrap"
import ClientData from "./Client-data"
import CategoryData from "./Category-data"

const CCData = () => {
    return (
        <section>
            <div className=" container mt-2">
                <Tabs defaultActiveKey="Clients" id="uncontrolled-tab-example" className="mb-1">
                    <Tab eventKey="Clients" title="Clients">
                        <ClientData />
                    </Tab>
                    <Tab eventKey="Categories" title="Categories">
                        <CategoryData />
                    </Tab>  
                </Tabs>   
            </div> 
           
        </section>
    )
}

export default CCData