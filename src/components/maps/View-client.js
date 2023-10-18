import { Col, Row, Spinner } from 'react-bootstrap'
import { LayerGroup, LayersControl, MapContainer, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { MinimapControl } from './Minimap'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { GoArrowLeft } from 'react-icons/go'
import Routing from './Routing'



const ViewClient = () => {
    const {taskId} = useParams()
    const [task, setTask] = useState({})

    useEffect(() => {
        const loader = async () => {
            try {
                const response = await axios.get(`http://localhost:4455/api/tasks/${taskId}`, {
                    headers: {
                        'authorization' : localStorage.getItem('token')
                    }
                })
                console.log(response)
                if(response.data.hasOwnProperty("_id")) {
                    setTask(response.data)
                } else {
                    alert(response.data?.message)
                }
            } catch(e) {
                console.log(e.message)
            }
        }
        loader()

    }, [taskId])
    console.log(task)

    return (
        <section>
            <div className="container mt-2">
                <Link to="/task-management">{<GoArrowLeft style={{width: "25px", height:"25px"}}/>} Back </Link> 
            </div>
            {Object.keys(task).length > 0 ? <div className='container mt-3 mb-3'>
                <Row>
                    <Col>  
                        <MapContainer style={{height: "500px", width: "100%"}} center={[12.883542, 77.5662616]} zoom={15} scrollWheelZoom={true}>
                            <TileLayer
                                attribution="Google Maps"
                                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                            />
                            <LayersControl position="topleft">
                                <LayersControl.BaseLayer checked name="Google Map">
                                    <TileLayer
                                    attribution="Google Maps"
                                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                                    />
                                </LayersControl.BaseLayer>

                                <LayersControl.BaseLayer name="Google Map Satellite">
                                    <LayerGroup>
                                    <TileLayer
                                        attribution="Google Maps Satellite"
                                        url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                                    />
                                    </LayerGroup>
                                </LayersControl.BaseLayer>
                            </LayersControl>
                            
                            <MinimapControl position="bottomleft" />

                            <Routing location={task.location}/>
                        </MapContainer>
                    </Col>
                </Row>
            </div> :  <Spinner animation="grow" variant="primary" size="lg" /> }
        </section>
    )
}

export default ViewClient