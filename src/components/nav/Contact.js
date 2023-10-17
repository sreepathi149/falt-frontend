const Contact = () => {
    return (
        <section>
            <div className="container mt-3 shadow bg-info bg-gradient ">
            <div className="row ">
            <div className="col-md-4 bg-primary p-5 text-white order-sm-first order-last">
                <h2>Let's get in touch</h2>
                <p>We're open for any suggestion or just to have a chat</p>
                <div className="d-flex mt-4">
                    <i className="bi bi-geo-alt"></i>
                    <p className="mt-3 ms-3">Address : 7A, Sri Sadhan, Kasavanahalli, Sarjapur Road, Bengaluru, Karnataka-560035</p>
                </div>
                <div className="d-flex mt-2">
                    <i className="bi bi-telephone-forward"></i>
                    <p className="mt-4 ms-3">Phone : 6360985853</p>    
                </div>
                <div className="d-flex mt-2">
                    <i className="bi bi-envelope"></i>
                    <p className="mt-4 ms-3">Email : projects.dct@hotmail.com</p>
                </div>
                </div>
                <div className="container col-md-8 shadow mt-4">
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="map mt-1">
                            <iframe title="location tracking app" width="100%" height="500px" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=sai venkateswara pg for gents sarjapur road&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                            </div>
                            <a href="https://connectionsgame.org/">Connections Puzzle</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default Contact

