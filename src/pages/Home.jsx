import { Link } from "react-router-dom";
import "./General.css";
import "./Home.css";

function Home() {

  return (

    <div className= "vehiculos-general-body">

      <h1>Vehicle Sales Platform</h1>

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

    </div>
  );
}

export default Home;