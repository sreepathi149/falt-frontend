import TasksStatus from "../data/Tasks-Status";
import TasksGraph from "../data/Tasks-Graph";
import { useRef } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  const ref = useRef()
  const tokenData = jwtDecode(localStorage.getItem('token'))

  const handleShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
      
    function success(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      const tracking = {lat : latitude, lng: longitude}
      const loader = async () => {
        try{
          const response = await axios.put("https://falt.onrender.com/api/employee-share-location", tracking , {
            headers:{
              "authorization" : localStorage.getItem('token')
            }
          })
          console.log(response.data)
        } catch(e) {
          alert(e.message)
        }
      }
      loader()
    }
        
    function error() {
      console.log("Unable to retrieve your location");
    }
  }

  const startInterval = () => {
    alert("location sharing started")
    const result = setInterval(() =>{ handleShare()}, 10000 * 360)
    ref.current = result
    console.log(ref.current)
  }

  const stopInterval = () => {
      alert('location sharing stopped')
      clearInterval(ref.current)
  }


  return (
    <section className="mt-2">
      {tokenData.role === "admin" ? null : <div className="container-fluid d-flex justify-content-end">
        <Button variant="outline-success" style={{height: "35px", width:"100px", marginRight:"2px" }} onClick={startInterval}>Share</Button>
        <Button variant="outline-danger" style={{height: "35px", width:"100px", marginLeft:"2px"}} onClick={stopInterval}>Stop</Button>
      </div>}
      <div className="mt-2">
        <TasksStatus />
      </div>
      <div className="mt-2">
        <TasksGraph />
      </div>
      </section>
  )
}
  
export default Dashboard