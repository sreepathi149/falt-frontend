import axios from 'axios';
import {BsCheck2} from 'react-icons/bs'
import {loadStripe} from '@stripe/stripe-js'

const Pricing = () => {
    const checkout = async (price,days) => {
        await loadStripe(
         "pk_test_51NxPZxSJnMtwcgEu5rpR9Qli343QadB5QghD2ppPqkwt4C7BxZ8SVrpQNCniLN0P9B7543Pv4bqs0gxXqk90i2ng00Kn5bhwQB"
        )
        const body=[{
          amount:price,
          day:days
        }]
        axios.post("https://falt.onrender.com/api/user/payment", body)
        .then((res)=>{
            if(res.data.url) {
                
                window.location.href=res.data.url
            }   
        })
        .catch((err)=>{
         console.log(err)
        })
     }

  return (
  <div className="container">
    <div className="row mt-2">
    <header>
            <div className="text-center w-75 my-4 mx-auto">
                <h1>Pricing</h1>
                <h5 className='fs-5 text-dark'>
                    Get Free-Trail of 14 Days <span><a href="/free-trail"> Free-Trail</a> </span>
                </h5>
            </div>
        </header>
        <div className="col-md-3">
           {/* Card 1 */}
           <div className="card rounded-4 shadow-lg border-0 mb-5">
                <div className="card-body">
                    <div>
                        <h4 className="fw-bold">Monthly</h4>
                    </div>
                    <h1 className="fs-1 fw-bold mt-4 mb-3 vstack gap-4">₹250</h1>
                    <ul className="list-group list-group-flush fs-5 mb-3">
                        <li className="list-group-item border-0"><BsCheck2 className='icons'/> Single User</li>
                        <li className="list-group-item border-0"><BsCheck2 className='icons'/> Valid For 30 days</li>
                    </ul>
                    <button className='btn btn-dark rounded-4 mt-3 mb-2 ' onClick={() => {checkout(250,30)}}>Subscribe</button>
                </div>
           </div>
        </div>
        <div className="col-md-3">
           {/* Card 2 */}
           <div className="card text-bg-dark rounded-4 shadow-lg border-0 mb-3">
                <div className="card-body">
                    <div>
                        <h4 className="fw-bold">Querterly</h4>
                    </div>
                    <h1 className="fs-1 fw-bold mt-3 mb-3 vstack gap-4">₹700</h1>
                    <ul className="list-group list-group-flush fs-5 mb-3">
                        <li className="list-group-item border-0 text-bg-dark"><BsCheck2 className='icons'/> Single User</li>
                        <li className="list-group-item border-0 text-bg-dark"><BsCheck2 className='icons'/> Valid For 90 days</li>
                    </ul>
                    <button className='btn btn-light rounded-4 mt-3 mb-3 ' onClick={(e) => {checkout(700,90)}}>Subscribe</button>
                </div>
           </div>
        </div>
        <div className="col-md-3">
           {/* Card 2*/}
           <div className="card rounded-4 shadow-lg border-0 mb-3">
                <div className="card-body">
                    <div>
                        <h4 className="fw-bold">6 Months</h4>
                    </div>
                    <h1 className="fs-1 fw-bold mt-3 mb-2 vstack gap-4">₹1400</h1>
                    <ul className="list-group list-group-flush fs-5 mb-2">
                        <li className="list-group-item border-0"><BsCheck2 className='icons'/> Single User</li>
                        <li className="list-group-item border-0"><BsCheck2 className='icons'/> Valid For 180 days</li>
                    </ul>
                    <button className='btn btn-dark rounded-4 mt-2 mb-2' onClick={() => {checkout(1400,180)}}>Subscribe</button>
                </div>
           </div>
        </div>
        <div className="col-md-3">
           {/* Card 1 */}
           <div className="card text-bg-dark rounded-4 shadow-lg border-0 mb-3">
                <div className="card-body">
                    <div>
                        <h4 className="fw-bold">Year</h4>
                    </div>
                    <h1 className="fs-1 fw-bold mt-3 mb-2 vstack gap-4">₹2300</h1>
                    <ul className="list-group list-group-flush fs-5 mb-2">
                        <li className="list-group-item border-0  text-bg-dark"><BsCheck2 className='icons'/> Single User</li>
                        <li className="list-group-item border-0  text-bg-dark"><BsCheck2 className='icons'/>Valid For 365 days</li>
                    </ul>
                    <button className='btn btn-light rounded-4 mt-2 mb-2' onClick={() => {checkout(2300,365)}}>Subscribe</button>
                </div>
           </div>
        </div>
    </div>
  </div>
  )
}

export default Pricing

