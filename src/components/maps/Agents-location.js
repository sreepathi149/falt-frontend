import { Col, Row } from 'react-bootstrap'
import { Marker, Popup, TileLayer, MapContainer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import {Icon} from 'leaflet'
import LocationMarker from './Current-marker'
import empMarker from "../../images/empMarker.png"
import { MinimapControl } from './Minimap'


const AgentLocation = (props) => {
    const { employees } = props
    console.log(employees, 'emp')
    const markerIcon = new Icon({
        iconUrl: empMarker,
        iconSize: [40, 40],
        iconAnchor: [12, 12],
        popupAnchor: [0, 0],
    })

    return (
        <div>
            <Row>
                <Col>  
                    <MapContainer style={{height: "500px", width: "100%"}} center={[12.883542, 77.5662616]} zoom={15} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        <LocationMarker />
                        
                        <MinimapControl position="topright" />

                        {employees.map((latlng, index) => {
                            return(
                                <Marker key={latlng._id} position={latlng.location[latlng.location.length-1]} icon={markerIcon}>
                                    <Popup> Agent-{latlng.name} </Popup>
                                </Marker>
                            )
                        })}
                    </MapContainer>
                </Col>
            </Row>
        </div>
    )
}

export default AgentLocation