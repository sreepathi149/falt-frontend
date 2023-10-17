import img1 from '../../images/home/img1.jpg'
import img2 from '../../images/home/img2.jpg'
import img3 from '../../images/home/img3.png'
import { Carousel, Container } from 'react-bootstrap';

const Home = () => {
  return (
  <section>
    <Container fluid>
          <div>
            <Carousel>
              <Carousel.Item interval={10000}>
                <img src={img1} className="d-block w-100 color-overlay" alt="First Slide" />
              </Carousel.Item>
              <Carousel.Item interval={10000}>
                <img src={img2} className="d-block w-100 color-overlay" alt="second Slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={img3} className="d-block w-100 color-overlay" alt="fourth Slide" />
              </Carousel.Item>
            </Carousel>
          </div>
        </Container>
  </section>
  );
}

export default Home;