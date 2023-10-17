import { Col, Row } from 'react-bootstrap'
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import {Icon} from 'leaflet'
import LocationMarker from './Current-marker'
import clientMarker from "../../images/clientMarker.png"
import empMarker from "../../images/empMarker.png"
import { MinimapControl } from './Minimap'


const Map = (props) => {
    const { clients, employees } = props
    console.log(employees)
    const markerIcon = new Icon({
        iconUrl: clientMarker,
        iconSize: [40, 40],
        iconAnchor: [12, 12],
        popupAnchor: [0, 0],
    })

    const employeeMarker = new Icon({
        iconUrl: empMarker,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, 0],
    })

    const locations = employees.map((emp) => {
        return emp.location[emp.location.length-1]
    })

    return (
        <div>
            <Row>
                <Col>  
                    <MapContainer style={{height: "500px", width: "100%"}} center={[12.883542, 77.5662616]} zoom={30} scrollWheelZoom={true}>
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
                        
                        <MinimapControl position="topright" />

                        <LocationMarker />
                        {clients.map((latlng) => {
                            return(
                                <Marker key={latlng._id} position={latlng.location} icon={markerIcon}>
                                    <Popup> client-{latlng.client?.name} </Popup>
                                </Marker>
                            )
                        })}
                        {employees.map((latlng) => {
                            return(
                                <Marker key={latlng._id} position={latlng.location[latlng.location.length-1]} icon={employeeMarker}>
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

export default Map