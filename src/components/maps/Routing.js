import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import "leaflet/dist/leaflet.css"
import { useMap, useMapEvents } from "react-leaflet";
import marker from '../../images/marker.png'

L.Marker.prototype.options.icon = L.icon({
    iconUrl: marker,
    iconSize: [40, 40],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
});

const Routing = (props) => {
    const {location} = props
    console.log(location)
  const map = useMap();
  const [position, setPosition] = useState({lat: "", lng:""})
    const map1 = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        //console.log(e.latlng)
        setPosition({...position, lat:e.latlng?.lat, lng:e.latlng?.lng})
        map1.flyTo(e.latlng, map.getZoom())
      },
    })

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(position.lat, position.lng), L.latLng(location.lat, location.lng)],
      routeWhileDragging: true
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map,position.lat,position.lng,location.lat,location.lng]);

  return null;
}

export default Routing