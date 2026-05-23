import { Link } from "react-router-dom";

function Home() {

  return (

    <div>

      <h1>Vehicle Platform</h1>

      <div>

        <Link to="/VehiculosListB2C">
          <button>
            B2C Marketplace
          </button>
        </Link>

        <Link to="/VehiculosListB2B">
          <button>
            B2B Sales Portal
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Home;