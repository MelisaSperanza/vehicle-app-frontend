import { Link } from "react-router-dom";
import "./General.css";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";


const images = [
  "/cuteCarPics/cuteCar1.png",
  "/cuteCarPics/cuteCar2.png",
  "/cuteCarPics/cuteCar3.png",
  "/cuteCarPics/cuteCar4.png",
  "/cuteCarPics/cuteCar5.png",
  "/cuteCarPics/cuteCar6.png",
  "/cuteCarPics/cuteCar7.png",
  "/cuteCarPics/cuteCar8.png",
  "/cuteCarPics/cuteCar9.png",
  "/cuteCarPics/cuteCar10.png",
  "/cuteCarPics/cuteCar11.png",
  "/cuteCarPics/cuteCar12.png",
  "/cuteCarPics/cuteCar13.png",
  "/cuteCarPics/cuteCar14.png",
  "/cuteCarPics/cuteCar15.png",
  "/cuteCarPics/cuteCar16.png",
  "/cuteCarPics/cuteCar17.png",
  "/cuteCarPics/cuteCar18.png",
  "/cuteCarPics/cuteCar19.png",
  "/cuteCarPics/cuteCar20.png"
];

function Home() {

  return (

    <div className="home-background">
    

      <div className="home-header">

  <h1 className="home-title">
    Vehicle Sales Platform
  </h1>

  <div className="home-header-right">

    <img
      src="/your-logo-here.png"
      alt="Logo"
      className="home-logo"
    />

    <img
      src="/userIcon.png"
      alt="User"
      className="home-user-icon"
    />

  </div>

</div>

      <div className= "home-buttons">

        <Link to="/VehiculosListB2C">
          <button className="home-button">
            B2C Marketplace
          </button>
        </Link>

        <Link to="/VehiculosListB2B">
          <button className="home-button">
            B2B Sales Portal
          </button>
        </Link>

      </div>

      
        <Swiper
            modules={[Autoplay]}
              autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            className="mySwiper"
          >
           
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="slideContainer">
                <img
                  src={img}
                  alt="vehicle"
                  className="slideImage"
              />
              </div>
              </SwiperSlide>
            ))}
            
        </Swiper>
      

    </div>
  );
}

export default Home;