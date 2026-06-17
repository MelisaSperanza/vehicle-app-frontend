import { useEffect, useState } from "react";

function useVehiculos() {

  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      const fetchVehiculos = async () => {
    try {
     // const res = await fetch(`${API_URL}/api/vehiculos`);
      const res = await fetch ("https://vehiculos-backend-rx13.onrender.com/api/vehiculos");
      const data = await res.json();

    //fetch("/api/vehiculos")
    //fetch("https://vehiculos-backend-rx13.onrender.com/api/vehiculos")
    //fetch(`${process.env.REACT_APP_API_URL}/api/vehiculos`)

      /*.then((res) => {

        if (!res.ok) {
          throw new Error("Error al cargar vehículos");
        }

        return res.json();
      })

      .then((data) => {
        setVehiculos(data);
        setLoading(false);
      })

      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });*/


      setVehiculos(data);
} catch (error) {
  console.error("Error fetching vehiculos:", error);
}
      };

      fetchVehiculos();
  }, []);

  return {
    vehiculos,
    error,
    loading
  };
}

export default useVehiculos;


