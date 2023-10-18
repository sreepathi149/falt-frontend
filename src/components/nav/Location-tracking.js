import {Container, Row,Col,Button} from 'react-bootstrap'
import {IoLocationSharp} from 'react-icons/io5'
import livetracking from '../../images/home/livetracking.jpg'
import { Link } from 'react-router-dom'
import '../../css/tracking.css'
import TrackClient from '../data/Track-client'

const Tracking = () => {
  return (
      <section>
        {!localStorage.getItem('token') && <Container fluid>
          <Row>
            <Col className='col-sm-6 mt-5'>
              <p className='text-center' style={{fontSize:"30px"}}><IoLocationSharp></IoLocationSharp>Location <strong style={{color:"red"}}>Tracking</strong></p>
              <br></br>
              <p className='text-left d-flex justify-content-center flex-column' style={{padding:"5px"}}>Manage, 
              Track and Collaborate with field personnel to improve productivity and efficiency to achieve end customer satisfaction.
              </p>
              <p className='text-left d-flex justify-content-center flex-column' style={{padding:"5px"}}>
              Field force management mobility solution enables supervised, well managed, and tracked performances which can improve the productivity and efficiency of the business be it Sales or Services.
              </p>
              <p className='text-left d-flex justify-content-center flex-column' style={{padding:"5px"}}>
              Field Force Management enables both seamless field operations and real-time service for customers. Field Force management enables the on field members to have access to the right information and be both cost- and time-efficient in scheduling and routing.
              </p>
              <Button variant="outline-primary" size="lg" as={Link} to="/freetrail">Get Free Trail</Button>
            </Col>
            <Col className='col-md-6 mt-5 d-flex align-items-center'>
            <img src={livetracking} className='image-fluid animated' alt="home img"></img>
            </Col>
          </Row>
        </Container>}
        {localStorage.getItem('token') && <Container>
          <TrackClient />
        </Container>}
      </section>
  )
}
export default Tracking
