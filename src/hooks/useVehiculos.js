import { useEffect, useState } from "react";

function useVehiculos() {

  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {

  const fetchVehiculos = async () => {

    try {

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/vehiculos`
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      console.log("Vehículos recibidos:", data);

      setVehiculos(data);

    } catch (error) {

      console.error("Error fetching vehiculos:", error);

      setError(error.message);

    } finally {

      setLoading(false);

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


