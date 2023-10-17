import { useState } from "react"
import {Marker, Popup, useMapEvents} from "react-leaflet"
import {L, Icon} from 'leaflet'
import marker from "../../images/marker.png"

const LocationMarker = () => {
    const [position, setPosition] = useState({lat: "", lng:""})
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        //console.log(e.latlng)
        setPosition({...position, lat:e.latlng?.lat, lng:e.latlng?.lng})
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    const markerIcon = new Icon({
        iconUrl: marker,
        iconSize: [40, 40],
        iconAnchor: [12, 12],
        popupAnchor: [0, 0],
    });

    return (
        <div>
         <Marker position={position} icon={markerIcon}>
            <Popup>You are here</Popup>
        </Marker>
        </div> 
    )
  }
  
export default LocationMarker